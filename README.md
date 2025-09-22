# The BLK Nest 🪹

The BLK Nest is a community-driven directory and resource hub for Black families.  
Our mission is simple: **make it easier to find trusted providers, resources, and support built with us in mind.**

This project exists because too often, Black families face barriers to culturally competent, affirming, and accessible care.  
The BLK Nest is here to change that — one contribution at a time.

---

## 🌱 Why This Exists

- To help Black families find **trusted providers** (pediatricians, nannies, pelvic floor therapists, and more)  
- To gather and share **resources** that uplift our health, education, culture, and community  
- To build a **village** where information is freely accessible and maintained by us, for us  

Every submission helps another family. Every resource shared strengthens the community.  

---

## 🤝 How to Contribute

There are **two main ways** you can help grow The BLK Nest:

### 1. Quick Submission (Non-technical users)

Not familiar with GitHub? No problem.  
You can use our **web form** to submit a provider or resource in just a few minutes.

👉 [Submit a Provider](https://theblknest.org/contribute)  

---

### 2. GitHub Contribution (For developers / technical users)

The BLK Nest is open-source. If you’re comfortable with GitHub, you can add providers and resources directly.

**Steps:**
1. Fork this repository  
2. Add your provider or resource to the appropriate JSON file in the `/data` directory  
3. Follow the existing JSON structure carefully (see below)  
4. Commit your changes and open a Pull Request  

**Example JSON Entry:**
```json
{
  "id": "unique-provider-id",
  "name": "Dr. Jane Smith",
  "specialty": "Pediatrics",
  "location": "Detroit, MI",
  "phone": "(555) 123-4567",
  "email": "contact@example.com",
  "website": "https://example.com",
  "description": "Board-certified pediatrician with 10+ years of experience serving Black families.",
  "services": ["Well-child visits", "Immunizations"],
  "acceptsInsurance": true,
  "languages": ["English", "Spanish"],
  "yearsExperience": 10
}
```

## Files to Edit

- `data/pediatricians.json` → Pediatricians  
- `data/nannies.json` → Nannies & childcare providers  
- `data/pelvic-floor-therapists.json` → Pelvic floor therapists  

---

## ✨ Contribution Guidelines

- Double-check all contact info (phone, email, website)  
- Use clear, concise bios/descriptions  
- Leave out fields you don’t know — don’t guess  
- Providers and resources should directly serve Black families  
- Be respectful and accurate — this directory exists to build trust  

---

## 💛 Why Contribute?

Every provider you add helps another Black family find the care and support they deserve.  
Together, we’re building a stronger, more connected community — a village where Black families can thrive.  

Thank you for being part of this work.  

---

## 📬 Questions?

- Open an **Issue** here on GitHub  
- Want to connect outside GitHub? Visit [theblknest.org](https://theblknest.org)  

---

## 🪹 The BLK Nest: *Our Village, Our Care, Our Future.*
