using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace my_new_app
{
    // Stapel class is Generieke class
    public class Stapel<T> { 
    private Knooppunt <T> topknooppunt;   // Wordt gebruikt om de topknooppunt van een stapel te bewaren.

        public Stapel()
    {
        topknooppunt = null;
    }

   
    // De stapel maakt gebruik van een inner class genaamd Knooppunt, die een knoop van de stapel voorstelt
    private class Knooppunt<T>
    {
        public T waarde;
        public Knooppunt<T> volgende;

        public Knooppunt(T waarde)
        {
            this.waarde = waarde;
            this.volgende = null;
        }
    }



    // Voegt een nieuwe waarde toe aan de topknooppunt van de stapel.
    public void Duw(T waarde)
    {
        if (waarde == null)
        {
            throw new InvalidDataException("Stapel is leeg");
        }
        // Hier wordt een knooppunt gemaakt met meegegeven waarde
        Knooppunt<T> knooppunt = new Knooppunt<T>(waarde);
        // Hier wordt de topknooppunt waarde aan de volgende knooppunt gegeven
        knooppunt.volgende = topknooppunt;
        // Hier wordt vervolgens de nieuwe knooppunt meegegeven aan de topknooppunt
        topknooppunt = knooppunt;
    }

    // Pakken van de topknooppunt waarde.
    public T Pak()
    {
        // Hier is check op topknooppunt of hij leeg is of niet
        if (topknooppunt == null)
        {
            throw new InvalidOperationException("Stapel is leeg");
        }
        // Als de topknooppunt niet leeg is, wordt de waarde topknooppunt bewaard voor teruggeven
        T DeGepaakteTopknooppuntWaarde= topknooppunt.waarde;
        // Hier wordt de waarde van topknooppunt vervangen met de volgende knooppunt waarde
        topknooppunt = topknooppunt.volgende;
        // Hier wordt de gepaakte waarde teruggegeven.
        return DeGepaakteTopknooppuntWaarde;
    }
}
    
}