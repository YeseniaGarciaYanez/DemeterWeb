namespace Demeter.API.DTOs
{
    public class FarmerDto
    {
        public int FarmerId { get; set; }
        public string Name { get; set; } = "";
        public string Email { get; set; } = "";
        public string AreaName { get; set; } = "";
        public int GeneratedReports { get; set; }
        public string PhotoUrl { get; set; } = "/images/default-farmer.jpg"; // Valor por defecto aquí
    }
}