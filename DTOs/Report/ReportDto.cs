namespace Demeter.API.DTOs.Report;

public class ReportDto
{
    public int crop_id { get; set; }
    public int farmer_id { get; set; }
    public string type { get; set; }
    public string description { get; set; }
}