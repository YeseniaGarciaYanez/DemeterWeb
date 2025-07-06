using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Demeter.API.Data;
using Demeter.API.Models;
using Microsoft.AspNetCore.Http;



[Route("api/[controller]")]
[ApiController]
public class FarmerController : ControllerBase
{
    private readonly DemeterContext _context;

    public FarmerController(DemeterContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Farmer>>> GetFarmers()
    {
        return await _context.Farmers.Include(f => f.Area).ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Farmer>> GetFarmer(int id)
    {
        var farmer = await _context.Farmers.Include(f => f.Area).FirstOrDefaultAsync(f => f.Id == id);
        if (farmer == null) return NotFound();
        return farmer;

    }

    [HttpPost]
    public async Task<ActionResult<Farmer>> PostFarmer(Farmer farmer)
    {
        _context.Farmers.Add(farmer);
        await _context.SaveChangesAsync();
        return CreatedAtAction("GetFarmer", new { id = farmer.Id }, farmer);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutFarmer(int id, Farmer farmer)
    {
        if (id != farmer.Id) return BadRequest();

        _context.Entry(farmer).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteFarmer(int id)
    {
        var farmer = await _context.Farmers.FindAsync(id);
        if (farmer == null) return NotFound();

        _context.Farmers.Remove(farmer);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}

