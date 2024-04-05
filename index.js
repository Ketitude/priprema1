let tacno=false;
function podaciForme(){
    const textInput=document.getElementById('text');
    textInput.textContent='';
    tacno=true;
    const ocenaInput = document.getElementById('ocena');
    const ocena = ocenaInput.value;

    ocenaInput.nextElementSibling.textContent = '';

    if(ocena<5 || ocena>10 || isNaN(ocena)){
        ocenaInput.nextElementSibling.textContent = 'Ocena mora biti u opsegu od 5 do 10.';
        ocenaInput.nextElementSibling.style.color = 'red';
        tacno=false;
    }

    const brojIndeksaInput = document.getElementById('brojIndeksa');
    const brojIndeksa = brojIndeksaInput.value;

    brojIndeksaInput.nextElementSibling.textContent = '';

    const sablon=/^\d{4}\/\d{4}$/

    if (!sablon.test(brojIndeksa)) {
        brojIndeksaInput.nextElementSibling.textContent = 'Broj indeksa mora biti u formatu YYYY/XXXX. Godina mora biti veca od 2000, dok broj mora biti u opsegu [1 – 1000].';
        brojIndeksaInput.nextElementSibling.style.color = 'red';
        tacno = false;
    } else {
        const [godina, broj] = brojIndeksa.split('/');
        if (godina <= 2000) {
            brojIndeksaInput.nextElementSibling.textContent = 'Godina u broju indeksa mora biti veca od 2000.';
            brojIndeksaInput.nextElementSibling.style.color = 'red';
            tacno = false;
        }
        if (broj < 1 || broj > 1000) {
            brojIndeksaInput.nextElementSibling.textContent = 'Broj u broju indeksa mora biti u opsegu od 1 do 1000.';
            brojIndeksaInput.nextElementSibling.style.color = 'red';
            tacno = false;
        }
    }
    const polozioCheckbox = document.getElementById('polozio');
    const p=document.querySelector('.error_1');
    if (ocena >= 6 && ocena <= 10 && !polozioCheckbox.checked) {
        p.textContent = 'Ako je ocena u opsegu od 6 do 10, checkbox "Polozio/la" mora biti oznacen.';
        p.style.color = 'red';
        tacno = false;
    }

    if (tacno) {
        const datumIzlaskaInput = document.getElementById('datumIzlaska');
        const datumIzlaska = datumIzlaskaInput.value;
        const rednibrInput= document.getElementById('rb');
        const rednibr = rednibrInput.value;
        let rokovi=document.querySelectorAll('input[name="radio"]');
        let rok="rok nije definisan";
        let polozen;
        if(polozioCheckbox.checked){
            polozen=true;
        }
        else
            polozen=false;
        rokovi.forEach(radio => {
            if(radio.checked){
                rok=radio.value;
            }
        });

        let podaci = {
            "ocena": ocena,
            "br indeksa":brojIndeksa,
            "redni broj izlaska": rednibr,
            "datum izlaska": datumIzlaska,
            "rok": rok,
            "polozen" : polozen 
        };

        let jsonString = JSON.stringify(podaci);
        return jsonString;
}
}


    document.addEventListener('DOMContentLoaded', function() {
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.addEventListener('click', function() {

        podaciForme();
        const rezultat = podaciForme();
        console.log('Rezultat je JSON string:', rezultat);

        if(tacno){
        const textInput=document.getElementById('text');
        textInput.textContent=rezultat;
        document.getElementById('forma').reset();
        let greske=document.querySelectorAll(".error");
        let greska1=document.querySelector(".error_1");
        greska1.textContent='';
        greske.forEach(greska=>{
            greska.textContent='';
        });
        }
        
        });


});
