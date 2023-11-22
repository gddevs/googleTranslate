const sourceInput = document.getElementById("source-text");
const targetInput = document.getElementById("target-text");
const sourceLang = document.getElementsByName("source-lang");
const targetLang = document.getElementsByName("target-lang");
let timeOutId;
let isLoading = false;
sourceInput.addEventListener("input", handleTyping);

function handleTyping(){

    clearTimeout(timeOutId);
    timeOutId =  setTimeout(async() => {
        await translate();
    }, 1000);
}

async function translate() {
    if (isLoading || !sourceInput.value) {
        return;
    }

    isLoading = true;
    const sourceLangChecked = Array.from(sourceLang).find(el => el.checked).value;
    const targetLangChecked = Array.from(targetLang).find(el => el.checked).value;
    targetInput.value = targetInput.value === "Tradução" ? "Traduzindo..." : targetInput.value + "...";

    const url = 'https://google-translate1.p.rapidapi.com/language/translate/v2';
const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'Accept-Encoding': 'application/gzip',
		'X-RapidAPI-Key': '63fb19c91amshf3587f148f63c8ap1fcaf7jsn023453a7b4cd',
		'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
	},
	body: new URLSearchParams({
		q: sourceInput.value,
		target: targetLangChecked,
		source: sourceLangChecked
	})
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
    targetInput.value = result.data.translations[0].translatedText;
	console.log(result.data.translations[0].translatedText);
} catch (error) {
	console.error(error);
}


    finally {
    isLoading = false;
    }
}