namespace Demeter.API.Models
{
    public class Crop
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string? Type { get; set; }
        public DateTime? StartDate { get; set; }
        public int AreaId { get; set; }
        public Area? Area { get; set; }
    }
}
