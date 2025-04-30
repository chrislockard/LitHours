package main

import (
	"fmt"
	"net/http"
)

func main() {
	// Create a file server handler to serve static files from the current directory
	fs := http.FileServer(http.Dir("."))

	// Wrap the file server with a custom handler to add no-cache headers
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// Set no-cache headers
		w.Header().Set("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
		w.Header().Set("Pragma", "no-cache")
		w.Header().Set("Expires", "0")

		// Serve the file using the file server handler
		fs.ServeHTTP(w, r)
	})

	// Start the server on port 8000
	port := 8000
	fmt.Printf("Serving at http://localhost:%d\n", port)
	err := http.ListenAndServe(fmt.Sprintf(":%d", port), nil)
	if err != nil {
		fmt.Printf("Failed to start server: %v\n", err)
	}
}
