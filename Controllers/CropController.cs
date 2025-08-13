<<<<<<< HEAD
using Demeter.API.Data;
using Demeter.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Demeter.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CropController : ControllerBase
    {
        private readonly DemeterContext _context;

        public CropController(DemeterContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Crop>>> GetCrops()
        {
            return await _context.Crops.Include(c => c.Area).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Crop>> GetCrop(int id)
        {
            var crop = await _context.Crops.Include(c => c.Area).FirstOrDefaultAsync(c => c.id == id);
            if (crop == null) return NotFound();
            return crop;
        }

        [HttpPost]
        public async Task<ActionResult<Crop>> PostCrop(Crop crop)
        {
            _context.Crops.Add(crop);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetCrop", new { id = crop.id }, crop);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutCrop(int id, Crop crop)
        {
            if (id != crop.id) return BadRequest();
            _context.Entry(crop).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCrop(int id)
        {
            var crop = await _context.Crops.FindAsync(id);
            if (crop == null) return NotFound();
            _context.Crops.Remove(crop);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
=======
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Demeter.API.Data;
using Demeter.API.Models;
using Microsoft.AspNetCore.Http;

[Route("api/[controller]")]
[ApiController]
public class CropController : ControllerBase
{
    private readonly DemeterContext _context;

    public CropController(DemeterContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Crop>>> GetCrops()
    {
        return await _context.Crops.Include(c => c.Area).ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Crop>> GetCrop(int id)
    {
        var crop = await _context.Crops.Include(c => c.Area).FirstOrDefaultAsync(c => c.Id == id);
        if (crop == null) return NotFound();
        return crop;
    }

    [HttpPost]
    public async Task<ActionResult<Crop>> PostCrop(Crop crop)
    {
        _context.Crops.Add(crop);
        await _context.SaveChangesAsync();
        return CreatedAtAction("GetCrop", new { id = crop.Id }, crop);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutCrop(int id, Crop crop)
    {
        if (id != crop.Id) return BadRequest();

        _context.Entry(crop).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCrop(int id)
    {
        var crop = await _context.Crops.FindAsync(id);
        if (crop == null) return NotFound();

        _context.Crops.Remove(crop);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}

>>>>>>> 0ee16faa2c7dfa8cb5ac6ccd7b30ffd6dba004ed
