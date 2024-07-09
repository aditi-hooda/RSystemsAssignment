using HackerNewsAPI.Models;
namespace HackerNewsAPI.Services
{
    public interface IStoriesService
    {
        Task<List<Story>> GetNewestStoriesAsync(int pageSize, int pageNumber);
        List<Story> SearchStoriesAsync(string query, int pageSize = 10, int pageNumber = 1);
    }
}
