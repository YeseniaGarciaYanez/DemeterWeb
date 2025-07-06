namespace Demeter.API.Models
{
    public class Farmer
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public int AreaId { get; set; }
        public Area? Area { get; set; }
    }
}
