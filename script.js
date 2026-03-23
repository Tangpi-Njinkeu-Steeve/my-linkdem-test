document.getElementById('generate-btn').addEventListener('click', function() {
    let contacts = [];

    // 1. Loop through the 4 sections to get data [cite: 79]
    for (let i = 1; i <= 4; i++) {
        const name = document.getElementById(`name${i}`).value;
        const number = document.getElementById(`number${i}`).value;
        const isWhatsapp = document.getElementById(`whatsapp${i}`).checked; // [cite: 80]

        if (name && number) {
            contacts.push({ n: name, num: number, w: isWhatsapp });
        }
    }

    if (contacts.length === 0) {
        alert("Please enter at least one contact name and number.");
        return;
    }

    // 2. Encode data to Base64 (The "Secret Shield") [cite: 81]
    const jsonString = JSON.stringify(contacts);
    const encodedData = btoa(jsonString);

    // 3. Build the URL for the "Find" page [cite: 82]
    // window.location.origin automatically detects if you are on localhost or a real website
    const baseURL = window.location.origin + "/find.html"; 
    const finalURL = `${baseURL}?id=${encodedData}`;

    // 4. NEW: Redirect to the dedicated Print Page
    // This sends the finalURL to your pre-designed print.html [cite: 83]
    const encodedQRData = encodeURIComponent(finalURL);
    window.location.href = `print.html?qr=${encodedQRData}`;
});