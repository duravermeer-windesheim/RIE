export const environment = {
	googleSpreadsheet: {
		googleSpreadsheetId: '<Your spreadsheet ID here>',
		googleSpreadsheetApiKey: '<Your API Key here>',
	},
	advice: {
		maximumForScenarioDecision: 200,
		maximumBeforeMeasureRecs: 70,
		measureRecs: {
			motorist: ["Snelheid verlagen", "Flitscamera’s plaatsen"],
			residents: ["Drempels plaatsen"],
			vkm: ["Snelheid verlagen"],
			roadWorker: ["Ingang werkvak bij oprit"]
		}
	},
	sheetNames: {
		measures: "Maatregelen",
		risks: "Risicos"
	},
	colorConfig: {
		dv: {
			primary: "#005951",
			secondary: "#F3E33F"
		},
		bw: {
			primary: "#000000",
			secondary: "#ffffff"
		},
		hc: {
			primary: "#01008A",
			secondary: "#ffffff"
		},
	},
	fontConfig: {
		defaultFontSize: 15,
		minimumFontSize: 10,
		maximumFontSize: 30
	},
	localStorageSettingsKey: 'dura_vermeer_rie_settings'
};


