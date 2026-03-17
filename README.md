# 🍁 Canada Task Tracker

The **Canada Task Tracker** is a web application focused on personal productivity, developed to help organize daily goals aimed at an immigration plan to Canada. This project is part of my journey in my Software Engineering degree.

> **Note:** The tasks currently listed are part of my personal routine. Feel free to modify, add, or remove any tasks in the code to better suit your own goals and needs.

## 🚀 Technologies Used

* **Frontend:** HTML5, CSS3 (Responsive and Thematic Design 🇨🇦) and Vanilla JavaScript.
* **Backend as a Service (BaaS):** [Supabase](https://supabase.com/) (PostgreSQL) for data persistence.
* **Integration:** Supabase JS Client for CRUD operations.

## 📌 Features

* **Section 1 (Work):** Recurrent task counter with dynamic increment.
* **Section 2 (Main Goals):** Checklist for primary goals like English and Development.
* **Section 3 (Secondary):** Checklist for long-term goals such as Immigration, Portfolio, and Bible study.
* **Smart History:** Search system for specific dates or periods, with automatic display of the previous day's progress.
* **Cloud Persistence:** Data saved in real-time in the database.

## 🛠️ How to Install and Run

This project uses Database Security (RLS); you will need to configure your own keys:

1.  Clone this repository:
    ```bash
    git clone [https://github.com/YOUR_USER/canada-task-tracker.git](https://github.com/YOUR_USER/canada-task-tracker.git)
    ```
2.  Rename the file `config.example.js` to `config.js`.
3.  Insert your `SUPABASE_URL` and `SUPABASE_KEY` (anon public) obtained in your Supabase project panel.
4.  Ensure that the `historiy` table was created in your database with the columns: `job` (int), `primary` (text), and `secondary` (text).
5.  Open `index.html` in any browser.

## 🛡️ Security and Best Practices

This project applies fundamental concepts of Software Engineering:
* **Secrets Protection:** Using `.gitignore` to prevent API key leaks in the Git history.
* **Row Level Security (RLS):** Security applied directly to the database layer to control public access permissions.
* **Responsive Design:** Interface adapted for mobile use.

---
Developed by **Gustavo Vieira** 🇧🇷 ➡️ 🇨🇦