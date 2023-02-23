using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace my_new_app
{
    // Stapel class is Generieke class
    public class Stapel<T> { 
    private Vakje <T> bovensteVakje;   // Wordt gebruikt om de bovensteVakje van een stapel te bewaren.

        public Stapel()
    {
        bovensteVakje = null;
    }

   
    // De stapel maakt gebruik van een inner class genaamd Vakje, die een knoop van de stapel voorstelt
    private class Vakje<T>
    {
        public T waarde;
        public Vakje<T> volgende;

        public Vakje(T waarde)
        {
            this.waarde = waarde;
            this.volgende = null;
        }
    }



    // Voegt een nieuwe waarde toe aan de bovensteVakje van de stapel.
    public void Duw(T waarde)
    {
        if (waarde == null)
        {
            throw new InvalidDataException("Stapel is leeg");
        }
        // Hier wordt een Vakje gemaakt met meegegeven waarde
        Vakje<T> Vakje = new Vakje<T>(waarde);
        // Hier wordt de bovensteVakje waarde aan de volgende Vakje gegeven
        Vakje.volgende = bovensteVakje;
        // Hier wordt vervolgens de nieuwe Vakje meegegeven aan de bovensteVakje
        bovensteVakje = Vakje;
    }

    // Pakken van de bovensteVakje waarde.
    public T Pak()
    {
        // Hier is check op bovensteVakje of hij leeg is of niet
        if (bovensteVakje == null)
        {
            throw new InvalidOperationException("Stapel is leeg");
        }
        // Als de bovensteVakje niet leeg is, wordt de waarde bovensteVakje bewaard voor teruggeven
        T DeGepaakteTopVakjeWaarde= bovensteVakje.waarde;
        // Hier wordt de waarde van bovensteVakje vervangen met de volgende Vakje waarde
        bovensteVakje = bovensteVakje.volgende;
        // Hier wordt de gepaakte waarde teruggegeven.
        return DeGepaakteTopVakjeWaarde;
    }
}
    
}