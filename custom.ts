// Definisanje smerova okretanja (Levo / Desno)
enum SmerOkretanja {
    //% block="left"
    Levo,
    //% block="right"
    Desno
}

// Definisanje smera kretanja (Napred / Nazad)
enum SmerKretanja {
    //% block="forward"
    Napred,
    //% block="backward"
    Nazad
}

/**
 * Moja prilagodjena Maqueen ekstenzija za precizno okretanje
 */
//% color="#00BCD4" icon="\uf01e" block="Custom Maqueen"
namespace customMaqueen {
    // Globalna promenljiva za brzinu, pocetna vrednost je 40
    let brzinaOkretanja = 40;

    /**
     * Podesava brzinu okretanja robota.
     * @param brzina vrednost od 0 do 255, eg: 40
     */
    //% block="set maqueen rotate speed %brzina"
    //% brzina.min=0 brzina.max=255
    export function setMaqueenRotateSpeed(brzina: number): void {
        brzinaOkretanja = brzina;
    }

    /**
     * Odmah zaustavlja okretanje robota.
     */
    //% block="maqueen stop rotate"
    export function maqueenStopRotate(): void {
        // Koristimo fabricku komandu iz maqueen ekstenzije da ugasi sve motore
        maqueen.motorStop(maqueen.Motors.All);
    }

    /**
     * Okrece Maqueen robota za odredjeni broj stepeni u zeljenom smeru.
     * @param smerSmer biranje Levo ili Desno
     * @param smerKretanja biranje Napred ili Nazad
     * @param stepeni broj stepeni za okret, eg: 34
     */
    //% block="Maqueen rotate %smerSmer %smerKretanja by %stepeni"
    //% stepeni.min=0 stepeni.max=360
    export function maqueenRotate(smerSmer: SmerOkretanja, smerKretanja: SmerKretanja, stepeni: number): void {
        // Matematicki trik: sto je manja brzina, treba nam vise vremena za isti ugao.
        // Formula uskladjuje vreme na osnovu unete brzine (bazirano na brzini 40 gde je 1 stepen oko 5ms)
        let baznoVremePoStepenu = 5;
        let faktorBrzine = 40 / brzinaOkretanja;
        let ukupnoVreme = stepeni * baznoVremePoStepenu * faktorBrzine;

        if (smerSmer == SmerOkretanja.Desno) {
            if (smerKretanja == SmerKretanja.Napred) {
                // Okret udesno (napred): Levi motor ide napred, desni unazad
                maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, brzinaOkretanja);
                maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, brzinaOkretanja);
            } else {
                // Okret udesno (nazad): Kontra smerovi motora
                maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, brzinaOkretanja);
                maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, brzinaOkretanja);
            }
        } else if (smerSmer == SmerOkretanja.Levo) {
            if (smerKretanja == SmerKretanja.Napred) {
                // Okret ulevo (napred): Desni motor ide napred, levi unazad
                maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, brzinaOkretanja);
                maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, brzinaOkretanja);
            } else {
                // Okret ulevo (nazad): Kontra smerovi motora
                maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, brzinaOkretanja);
                maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, brzinaOkretanja);
            }
        }

        // Ako su stepeni postavljeni na 0, robot se vrti beskonacno (dok ne pozovete stop)
        // Ako je uneta vrednost veca od 0, ceka se izracunato vreme i robot staje
        if (stepeni > 0) {
            basic.pause(ukupnoVreme);
            maqueenStopRotate();
        }
    }
}
