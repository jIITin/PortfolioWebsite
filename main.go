package main

import (
	"encoding/json"
	"log"
	"net/http"
)

type Resume struct {
	Name         string       `json:"name"`
	Phone        string       `json:"phone"`
	Email        string       `json:"email"`
	LinkedIn     string       `json:"linkedin"`
	Location     string       `json:"location"`
	Education    []Education  `json:"education"`
	Experience   []Experience `json:"experience"`
	Projects     []Project    `json:"projects"`
	Achievements []string     `json:"achievements"`
	Skills       Skills       `json:"skills"`
}

type Education struct {
	Institution string `json:"institution"`
	Degree      string `json:"degree"`
	Duration    string `json:"duration"`
	Location    string `json:"location"`
	Score       string `json:"score"`
}

type Experience struct {
	Title    string   `json:"title"`
	Company  string   `json:"company"`
	Duration string   `json:"duration"`
	Location string   `json:"location"`
	Details  []string `json:"details"`
}

type Project struct {
	Name        string   `json:"name"`
	Description []string `json:"description"`
}

type Skills struct {
	Languages    []string `json:"languages"`
	Technologies []string `json:"technologies"`
	Interests    []string `json:"interests"`
}

func main() {
	// Define resume data
	resume := Resume{
		Name:     "Jitin",
		Phone:    "+91 7082461440",
		Email:    "jitiniitk@gmail.com",
		LinkedIn: "jIITin",
		Location: "Rewari, Haryana, India",
		Education: []Education{
			{
				Institution: "Indian Institute of Technology (IIT), Kanpur",
				Degree:      "Bachelor of Technology (B.Tech)",
				Duration:    "2019-2023",
				Location:    "Kanpur, Uttar Pradesh",
				Score:       "CGPA: 6.30",
			},
			{
				Institution: "Jawahar Navodaya Vidyalaya",
				Degree:      "Class 12th (CBSE)",
				Duration:    "2018-2019",
				Location:    "Bundi, Rajasthan",
				Score:       "86.6%",
			},
			{
				Institution: "Jawahar Navodaya Vidyalaya",
				Degree:      "Class 10th (CBSE)",
				Duration:    "2016-2017",
				Location:    "Rewari, Haryana",
				Score:       "CGPA: 9.40",
			},
		},
		Experience: []Experience{
			{
				Title:    "Software Development Engineer - I",
				Company:  "WiJungle",
				Duration: "June 2023 - Present",
				Location: "Gurugram, Haryana",
				Details: []string{
					"Improved endpoint security for Device Control, Application Control, Web Filtering, and DLP using C/C++ Linux kernel modules, reducing malware attacks by 50%.",
					"Standardized control protocols for WiFi, cameras, printers, network shares, USB, and Bluetooth, reducing hardware issues by 50% and improving management efficiency by 40%.",
					"Implemented whitelist/blacklist policies in application control, increasing security compliance by 30%.",
					"Developed systems to control application access on Linux, reducing policy enforcement time by 40%.",
					"Designed web filtering solutions using netfilterqueue, decreasing internet security complaints by 60%.",
					"Built DLP systems for application, web, network share, and USB using fanotify, enhancing data security.",
					"Technologies: C++, C, libnetfilter, fanotify, libudev, system calls, Linux.",
				},
			},
		},
		Projects: []Project{
			{
				Name: "Algorithm Visualizer",
				Description: []string{
					"Built visualizer for BubbleSort and InsertionSort using HTML, CSS, and JavaScript.",
					"Enhanced UI with algorithm-view buttons and Start/Resume/Reset functions.",
					"Developed in Visual Studio for user-friendly interaction.",
				},
			},
			{
				Name: "Travel Management System",
				Description: []string{
					"Designed system for booking hotels, destinations, and travel methods.",
					"Tracked transactions for travel, cab, and hotel bookings.",
					"Implemented OOP principles: Inheritance, Encapsulation, Polymorphism, Abstraction.",
				},
			},
		},
		Achievements: []string{
			"Secured All India Category Rank 1109 in JEE Advanced 2019 among 2.3 lakh candidates.",
			"Selected for KVPY 2019 in SX stream among 1 lakh candidates.",
			"Secured 98.2 percentile in JEE Mains 2019 among 1.2 million students.",
			"Awarded Panasonic Ratti Chhatr Scholarship (top 30 from 23 IITs).",
			"Received Dakshana Fellowship for academic excellence and leadership (top 1% from 661 JNVs).",
			"Honored with Governor Award in Bharat Scouts and Guides 2017.",
		},
		Skills: Skills{
			Languages:    []string{"C", "C++", "HTML", "SQL"},
			Technologies: []string{"Object-Oriented Programming", "CSS", "Operating Systems"},
			Interests:    []string{"Data Structures and Algorithms", "Full Stack Web Development"},
		},
	}

	// Serve static files
	fs := http.FileServer(http.Dir("./static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))

	// API endpoint to serve resume data
	http.HandleFunc("/api/resume", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		if err := json.NewEncoder(w).Encode(resume); err != nil {
			log.Printf("Error encoding JSON: %v", err)
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}
		log.Println("Served resume data via API")
	})

	// Serve index.html for the root path
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		log.Printf("Serving request for %s", r.URL.Path)
		http.ServeFile(w, r, "./static/index.html")
	})

	// Start server
	log.Println("Server starting on :8080...")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}
