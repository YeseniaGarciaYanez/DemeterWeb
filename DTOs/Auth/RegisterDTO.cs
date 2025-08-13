namespace Demeter.API.DTOs.Auth;

public class RegisterDto
{
    public string name { get; set; }
    public string email { get; set; }
    public string password { get; set; }
    public string role { get; set; }
}