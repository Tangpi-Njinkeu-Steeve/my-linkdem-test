/**
 * Link Dem | JS Engine v2.0
 * Purpose: Encode owner data and redirect to Print view
 */

document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');

    // 1. Safety Check: Only run if the button is on the page
    if (!generateBtn) {
        console.error("Link Dem Error: 'generate-btn' not found in HTML.");
        return;
    }

    generateBtn.addEventListener('click', function(e) {
        e.preventDefault(); // Prevents page refresh if inside a form

        let contacts = [];
        const ownerNameInput = document.getElementById('owner-name');
        const ownerName = ownerNameInput ? ownerNameInput.value.trim() : "The Owner";

        console.log("Shield Engaged: Processing data for " + ownerName);

        // 2. Loop through the 4 potential contact sections
        for (let i = 1; i <= 4; i++) {
            const nameEl = document.getElementById(`name${i}`);
            const numEl = document.getElementById(`number${i}`);
            const waEl = document.getElementById(`whatsapp${i}`);

            // Only grab values if the elements actually exist in HTML
            if (nameEl && numEl) {
                const name = nameEl.value.trim();
                const number = numEl.value.trim();
                const isWhatsapp = waEl ? waEl.checked : false;

                if (name !== "" && number !== "") {
                    contacts.push({ 
                        n: name, 
                        num: number, 
                        w: isWhatsapp 
                    });
                }
            }
        }

        // 3. Validation: Stop if no contacts were added
        if (contacts.length === 0) {
            alert("⚠️ Protection Failed: Please enter at least one emergency contact.");
            return;
        }

        // 4. The "Secret Shield" Encoding
        const dataToEncode = {
            owner: ownerName,
            list: contacts,
            timestamp: Date.now() // Added for unique QR tracking
        };

        try {
            // Convert Object -> JSON -> Base64
            const jsonString = JSON.stringify(dataToEncode);
            const encodedData = btoa(unescape(encodeURIComponent(jsonString))); 

            // 5. Build the Dynamic URLs
            // This handles local files (C:/...) and hosted URLs (https://...)
            const currentPath = window.location.pathname;
            const dirPath = currentPath.substring(0, currentPath.lastIndexOf('/'));
            const baseURL = window.location.origin + dirPath + "/find.html"; 
            
            const findURL = `${baseURL}?id=${encodedData}`;
            const encodedQRData = encodeURIComponent(findURL);

            // 6. Final Redirect to Print View
            console.log("Redirecting to Print Portal...");
            window.location.href = `print.html?qr=${encodedQRData}`;

        } catch (err) {
            console.error("Encryption Error:", err);
            alert("Something went wrong while securing your data. Please try again.");
        }
    });
});