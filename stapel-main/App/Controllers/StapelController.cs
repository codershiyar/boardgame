
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace my_new_app.Controllers;

[ApiController]
[Route("[controller]")]
public class StapelController : ControllerBase
{
    private static Stapel<String> BordMap = new Stapel<String>();

    [HttpGet()]
    public String PakBordMap()
    { 
        try
        {
            return BordMap.Pak();
        }
        
        catch (System.Exception) { }
       
        return "BordMap Stapel is leeg";
    }
    
    [HttpPost()]
        public ActionResult<String> Post([FromBody] Vakje NieuweVakje)
        {
            string NieuweVakjeJsonString = JsonSerializer.Serialize(NieuweVakje);
            Console.WriteLine(NieuweVakjeJsonString);
            BordMap.Duw(NieuweVakjeJsonString);
            return NieuweVakjeJsonString;
        }
        
        public class Vakje{
            public string Waarde{get;set;}
        }
}