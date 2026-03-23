document.getElementById('generate-btn').addEventListener('click', function() {
    let contacts = [];
    // NEW: Get the owner's name
    const ownerName = document.getElementById('owner-name').value || "the owner";

    for (let i = 1; i <= 4; i++) {
        const name = document.getElementById(`name${i}`).value;
        const number = document.getElementById(`number${i}`).value;
        const isWhatsapp = document.getElementById(`whatsapp${i}`).checked;

        if (name && number) {
            contacts.push({ n: name, num: number, w: isWhatsapp });
        }
    }

    if (contacts.length === 0) {
        alert("Please enter at least one contact name and number.");
        return;
    }

    // NEW: Include owner name in the object
    const dataToEncode = {
        owner: ownerName,
        list: contacts
    };

    const jsonString = JSON.stringify(dataToEncode);
    const encodedData = btoa(jsonString);

    // Build URL (Ensure this points to your Vercel URL once deployed)
    const baseURL = window.location.origin + "/find.html"; 
    const finalURL = `${baseURL}?id=${encodedData}`;

    const encodedQRData = encodeURIComponent(finalURL);
    window.location.href = `print.html?qr=${encodedQRData}`;
});