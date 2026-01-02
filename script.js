const sayiInput = document.getElementById("sayiInput");
const araBtn = document.getElementById("araBtn");
const sonuc = document.getElementById("sonuc");

const API_KEY = "6f76b02aa827a1b55f195dea7d4d054f";

araBtn.addEventListener("click", numaraSorgula);

async function numaraSorgula() {
    const number = sayiInput.value.trim();

    if (!number) {
        sonuc.innerHTML = "Lütfen telefon numarası girin.";
        return;
    }

    sonuc.innerHTML = "Yükleniyor...";

    try {
        const url = `http://apilayer.net/api/validate?access_key=${API_KEY}&number=${number}&country_code=TR&format=1`;
        const response = await fetch(url);
        const data = await response.json();

        if (gecerliTelefon(data)) {
            telefonBilgisi(data);
        } else {
            sonuc.innerHTML = "Geçersiz numara.";
        }

    } catch (error) {
        sonuc.innerHTML = "Yüklenemedi.";
    }
}

function gecerliTelefon(data) {
    return data.valid === true;
}

function telefonBilgisi(data) {
    sonuc.innerHTML = `
      Telefon: ${data.international_format}<br>
      Geçerli mi: ${data.valid}<br>
      Ülke: ${data.country_name}<br>
      Ülke Kodu: ${data.country_prefix}<br>
      Operatör: ${data.carrier || "Bilgi yok"}<br>
      Hat Türü: ${data.line_type || "Bilgi yok"}
    `;
}