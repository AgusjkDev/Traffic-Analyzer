const dotenv = require("dotenv");
const fs = require("fs");
const { exec } = require("child_process");

dotenv.config();

if (!fs.existsSync("./types")) {
    fs.mkdirSync("./types");
}

exec(
    `npx supabase gen types typescript --project-id ${process.env.SUPABASE_PROJECT_ID} > types/supabase.ts`,
    error => {
        if (error) {
            console.error(error);
            return;
        }

        console.log("Supabase types generated successfully ✅");
    }
);
