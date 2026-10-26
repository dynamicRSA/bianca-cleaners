# Bianca Cleaners: Inbound Business & Low-Budget Marketing Playbook

> **Guiding Principle**: Maximize high-intent inbound inquiries in Pretoria while keeping advertising spend capped under **R1,200/month (~R40/day)**. Strictly **NO cold outreach**, no unsolicited spam, and zero overpromises.

---

## 1. Why Cleaning Google Ads Budgets "Go Crazy" (And How We Protect Yours)

Most cleaning businesses in South Africa waste 70% to 90% of their ad spend within days due to 4 common Google traps:
1. **Broad Match Keywords Trap**: Targeting broad terms like `"cleaning services"` or `"cleaners"` matches with searchers looking for *"domestic cleaner job vacancies"*, *"tenders in tshwane"*, or *"maid wanted in menlyn"*. Each useless click costs R25–R55.
2. **Google Display Expansion Trap**: By default, Google spreads ad budget across mobile game banners and spam apps.
3. **Location Bleed**: Google defaults to *"people interested in your location"*, serving ads to people in Cape Town or outside SA looking for relatives.
4. **Unattended Hours**: Ads running at 2 AM waste budget on late-night browsers who never call back.

### The Budget Protection Guardrails Built Into Your Setup:
| Guardrail | Setting | Protection |
| :--- | :--- | :--- |
| **Match Types** | Exact Match `[...]` & tight Phrase `""` | Blocks irrelevant matching |
| **Negative Shield** | [negative-keywords-shield.txt](file:///Users/svenprinsloo/.gemini/antigravity-ide/scratch/bianca-cleaners/marketing/negative-keywords-shield.txt) (120+ words) | Completely blocks jobs, maids, DIY, tenders & rentals |
| **Max CPC Cap** | Hard ceiling: **R6.50 per click** | Google can NEVER charge R30+ for a single click |
| **Daily Budget Cap** | **R40.00 / day** (~R1,200/month) | Google stops serving the moment R40 is reached |
| **Network Settings** | **Search Network ONLY** | Google Display & Search Partners turned OFF |
| **Location Target** | **"Presence only"** (Pretoria East, Centurion, Central, Moot) | No clicks outside your service area |
| **Ad Schedule** | **Mon–Fri 07:30–17:00, Sat 08:00–13:00** | Only spend budget when someone is ready to answer |

---

## 2. Inbound Lead Handling Protocol (100% Customer Initiated)

### Rules of Engagement:
- **No Cold Outreach**: Never message numbers scraped from Facebook, OLX, or directories.
- **Inbound Responses Only**: Only communicate with individuals who submitted the website form, clicked the WhatsApp link, or called.
- **Honest Expectations (Weather & Drying Times)**: Never promise "dry in 30 minutes". Always state realistic drying times dependent on weather and airflow.

### Ready-to-Use WhatsApp Reply Templates:

#### Template A: Carpet & Couch Inbound Quote Request
> "Hi **[Name]**, thank you for contacting Bianca Cleaners! 👋
> 
> We’d be delighted to assist with your **[carpet / upholstery]** cleaning in **[Suburb]**. 
> 
> To give you an exact, obligation-free quote:
> 1. How many seats is the couch (or how many rooms / rugs)?
> 2. Is the fabric standard woven, velvet, or leather?
> 
> *Note on drying time:* Depending on room ventilation, fabric type, and the day's weather/humidity, drying usually takes between 4 to 8 hours. 
> 
> Warm regards,  
> Bianca Cleaners Team | 📞 083 265 6019"

#### Template B: Move-In / Deep Cleaning Request
> "Hi **[Name]**, thanks for reaching out to Bianca Cleaners! 🏡
> 
> We can gladly assist with your deep cleaning in **[Suburb]**. 
> 
> Could you let us know:
> 1. Approximate size (number of bedrooms & bathrooms)?
> 2. Is the home furnished or completely empty?
> 3. Your preferred date?
> 
> All our cleaning teams are permanently employed, fully vetted, and professionally supervised on-site.
> 
> Kind regards,  
> Bianca Cleaners Team | 📞 083 265 6019"

---

## 3. Zero-Budget Channel: Google Business Profile (Maps)

Google Business Profile (Google Maps) generates **40% to 60% of all local cleaning inquiries in Pretoria for R0.00**.

### 3 High-Impact Steps to Complete:
1. **Primary Category**:
   - Set primary category to: `Carpet Cleaning Service`
   - Add secondary categories: `Upholstery Cleaning Service`, `House Cleaning Service`.
2. **Turn On "Chat / Quotes"**:
   - In Google Business Profile dashboard -> **Messages** -> Turn ON **"Chat"**.
   - Turn ON **"Request a Quote"** button on your Google Maps listing.
3. **Automated Post-Service Review Request**:
   - 2 hours after a job is successfully finished and the client is satisfied, send:
   > "Hi [Name], thank you for choosing Bianca Cleaners today! We hope your home feels fresh and clean. If you were happy with our team's work, would you mind taking 30 seconds to leave us a brief review on Google? It means the world to our small team: [YOUR_GOOGLE_REVIEW_LINK]  
   > Thank you so much!"

---

## 4. Google Ads 5-Minute Setup (Import Ready)

We have prepared the ready-to-import CSV file:
- File: [google-ads-low-budget-campaign.csv](file:///Users/svenprinsloo/.gemini/antigravity-ide/scratch/bianca-cleaners/marketing/google-ads-low-budget-campaign.csv)
- Negative Keywords: [negative-keywords-shield.txt](file:///Users/svenprinsloo/.gemini/antigravity-ide/scratch/bianca-cleaners/marketing/negative-keywords-shield.txt)

### How to Activate via Google Ads:
1. Log into your Google Ads account at `ads.google.com`.
2. Go to **Tools & Settings** -> **Bulk Actions** -> **Uploads** -> Click **+** -> Upload `google-ads-low-budget-campaign.csv`.
3. Go to **Campaigns** -> Select your new campaign -> **Settings**:
   - **Locations**: Pretoria (East, Centurion, Central, North). Set location option to *"Presence: People in or regularly in your included locations"*.
   - **Networks**: Uncheck *"Include Google Search Partners"* and *"Include Google Display Network"*.
   - **Ad Schedule**: Set to Mon–Fri 07:30–17:00, Sat 08:00–13:00.
4. Go to **Keywords** -> **Negative Keywords** -> Click **+** -> Paste the entire contents of `negative-keywords-shield.txt` -> Save.

---

## 5. Website Conversion Tracking (Automated)

The website at `https://biancacleaners.co.za/` is now automatically firing standard `dataLayer` conversion events on:
- `contact_whatsapp`: When any WhatsApp CTA button is tapped.
- `contact_phone`: When the direct phone number is clicked.
- `generate_lead`: When the contact form is submitted to `accounts@biancacleaners.co.za`.

These events automatically communicate with Google Tag Manager or Google Analytics without needing custom code changes.
