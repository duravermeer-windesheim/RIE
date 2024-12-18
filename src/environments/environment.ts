export const environment = {
	// Handles the connection with Google Spreadsheet. DO NOT publish these credentials.
	googleSpreadsheet: {
		googleSpreadsheetId: '<Your spreadsheet ID here>',
		googleSpreadsheetApiKey: '<Your API Key here>',
	},
	// Thresholds for advice giving.
	advice: {
		// Maximum before the decision goes to the other scenario.
		maximumForScenarioDecision: 200,
		// Maximum until the recs are given.
		maximumBeforeMeasureRecs: 70,
		measureRecs: {
			motorist: ["Snelheid verlagen", "Flitscamera’s plaatsen"],
			residents: ["Drempels plaatsen"],
			vkm: ["Snelheid verlagen"],
			roadWorker: ["Ingang werkvak bij oprit"]
		}
	},
	// Names of the used Spreadsheets. Case-sensitive.
	sheetNames: {
		measures: "Maatregelen",
		risks: "Risicos"
	},
	// Settings for the colors. 3 version.
	colorConfig: {
		dv: { // dv->dura vermeer
			primary: "#005951",
			secondary: "#F3E33F"
		},
		bw: { // bw->black white
			primary: "#000000",
			secondary: "#ffffff"
		},
		hc: { // hc->high-contrast
			primary: "#01008A",
			secondary: "#ffffff"
		},
	},
	// Settings for the font size.
	fontConfig: {
		defaultFontSize: 15,
		minimumFontSize: 10,
		maximumFontSize: 30
	},
	// Settings are stored in local storage. This is the key used.
	localStorageSettingsKey: 'dura_vermeer_rie_settings'
};


