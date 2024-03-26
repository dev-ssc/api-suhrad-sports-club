const User = require('../models/User');
const Tournament = require('../models/Tournament');
const Excel = require('exceljs');
const { GoogleAuth } = require('google-auth-library');
const { google } = require('googleapis');
const { promisify } = require('util');
const { googleCred, sheetName, spreadSheetID } = require('../config/config');

async function exportDataExcel(req, res) {
    try {
        const users = await User.find();

        // Export to Excel
        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet('User Data');

        // Define headers for user data
        const userHeaders = ['_id', 'firstName', 'lastName', 'email', 'phoneNumber', 'street', 'city', 'state', 'postalCode'];

        // Define headers for tournament data
        const tournamentHeaders = ['tournamentName', 'userId', 'ratingBatting','ratingBowler','skillSet','teamId', 'bidAmount'];

        // Add headers to the worksheet
        worksheet.addRow([...userHeaders, ...tournamentHeaders]);

        // Add data to the worksheet
        for (const user of users) {
            const userData = [
                user._id,
                user.firstName,
                user.lastName,
                user.email,
                user.phoneNumber,
                user.address.street,
                user.address.city,
                user.address.state,
                user.address.postalCode
            ];

            // Fetch tournaments for this user from separate collection
            const tournaments = await Tournament.find({ userId: user._id });

            for (const tournament of tournaments) {
                const tournamentData = [
                    tournament.tournamentName,
                    tournament.userId,
                    tournament.skills.ratingBatting,
                    tournament.skills.ratingBowler,
                    tournament.skills.skillSet,
                    tournament.teamId,
                    tournament.bidAmount
                ];

                worksheet.addRow([...userData, ...tournamentData]);
            }
        }

        // Set response headers for Excel file download
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=users.xlsx');

        // Send the Excel file
        await workbook.xlsx.write(res);

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function exportDataToGoogleSheet() {
    try {
        // Set up authentication
        const auth = new GoogleAuth({
            credentials: JSON.parse(googleCred),
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        // Authorize the client
        const authClient = await auth.getClient();
        // Fetch users and tournaments from the database
        const users = await User.find();
        const userIds = users.map(user => user._id);
        const tournaments = await Tournament.find({ userId: { $in: userIds } });
        // Combine user data and tournament data
        const combinedData = users.map(user => {
            const userData = [
                user.firstName,
                user.lastName,
                user.email,
                user.phoneNumber,
                user.address.street,
                user.address.city,
                user.address.postalCode
            ];

            // Find tournaments for the current user
            const userTournaments = tournaments.filter(tournament => tournament.userId == user._id);
            console.log("tournaments",userTournaments)

            // Map tournament data to an array of arrays
            const tournamentData = userTournaments.map(tournament => {
                const tournamentInfo = [
                    tournament.skills.ratingBatting,
                    tournament.skills.ratingBowler,
                    tournament.skills.skillSet,
                    tournament.teamId,
                    tournament.bidAmount
                ];

                // Include isJoiningWaitingList if it exists
                if (tournament.isJoiningWaitingList !== undefined) {
                    tournamentInfo.push(tournament.isJoiningWaitingList);
                }

                return tournamentInfo;
            }
            );

            // Flatten tournamentData into a single array for the user
            const flattenedTournamentData = [].concat(...tournamentData);

            // Combine userData with flattenedTournamentData
            return userData.concat(flattenedTournamentData);
        });

        // Specify the spreadsheet ID and range
        const spreadsheetId = spreadSheetID;
        const range = sheetName;

        // Remove empty strings from combinedData
        // const cleanCombinedData = combinedData.map(row => row.map(cell => {
        //     if (typeof cell === 'string' && cell.trim() === '') {
        //         return null; // Replace empty string with null
        //     }
        //     return cell;
        // }));

        console.log("cleandata",combinedData)
        // Update data in the spreadsheet
        const updateOptions = {
            spreadsheetId,
            range,
            valueInputOption: 'USER_ENTERED',
            resource: { values: combinedData },
        };

        // Initialize Google Sheets API
        const sheets = google.sheets({ version: 'v4', auth: authClient });

        // Update Google Sheets
        await sheets.spreadsheets.values.update(updateOptions);

        console.log('Data exported to Google Sheets successfully.');
        // Explicitly return to stop further execution
        return;


    } catch (error) {
        console.error('Error exporting data to Google Sheets:', error);
    }
}



module.exports = {
    exportDataExcel,
    exportDataToGoogleSheet
};
