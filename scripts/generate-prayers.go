package main

import (
	"encoding/json"
	"fmt"
	"os"
)

// MonthDays defines the number of days in each month for a leap year
var MonthDays = map[string]int{
	"01": 31, // January
	"02": 29, // February (leap year)
	"03": 31, // March
	"04": 30, // April
	"05": 31, // May
	"06": 30, // June
	"07": 31, // July
	"08": 31, // August
	"09": 30, // September
	"10": 31, // October
	"11": 30, // November
	"12": 31, // December
}

// MonthNames maps month numbers to names for prayer text
var MonthNames = map[string]string{
	"01": "January",
	"02": "February",
	"03": "March",
	"04": "April",
	"05": "May",
	"06": "June",
	"07": "July",
	"08": "August",
	"09": "September",
	"10": "October",
	"11": "November",
	"12": "December",
}

// Hours lists the Canonical Hours
var Hours = []string{
	"Vigil",
	"Matins",
	"Lauds",
	"Prime",
	"Terce",
	"Sext",
	"None",
	"Vespers",
	"Compline",
}

// PrayerData represents the full JSON structure
type PrayerData map[string]map[string]map[string]string

func main() {
	// Initialize the root data structure
	data := make(PrayerData)

	// Iterate through each month
	for month := 1; month <= 12; month++ {
		monthStr := fmt.Sprintf("%02d", month)
		data[monthStr] = make(map[string]map[string]string)

		// Iterate through each day in the month
		for day := 1; day <= MonthDays[monthStr]; day++ {
			dayStr := fmt.Sprintf("%02d", day)
			data[monthStr][dayStr] = make(map[string]string)

			// Add prayers for each Canonical Hour
			for _, hour := range Hours {
				prayer := fmt.Sprintf("%s prayer for %s %s", hour, MonthNames[monthStr], dayStr)
				data[monthStr][dayStr][hour] = prayer
			}
		}
	}

	// Marshal the data to JSON with indentation
	jsonData, err := json.MarshalIndent(data, "", "  ")
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error marshaling JSON: %v\n", err)
		os.Exit(1)
	}

	// Write to prayers.json
	err = os.WriteFile("prayers.json", jsonData, 0644)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error writing to file: %v\n", err)
		os.Exit(1)
	}

	fmt.Println("Generated prayers.json")
}
