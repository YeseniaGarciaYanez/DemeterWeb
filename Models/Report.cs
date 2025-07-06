namespace Demeter.API.Models
{
    public class Report
    {
        public int Id { get; set; }
        public int CropId { get; set; }
        public Crop? Crop { get; set; }

        public int FarmerId { get; set; }
        public Farmer? Farmer { get; set; }

        public string Type { get; set; } = "";
        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
