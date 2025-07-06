namespace Demeter.API.Models
{
    public class AlertThreshold
    {
        public int Id { get; set; }
        public int SensorId { get; set; }
        public Sensor? Sensor { get; set; }
        public decimal MinValue { get; set; }
        public decimal MaxValue { get; set; }
    }
}
