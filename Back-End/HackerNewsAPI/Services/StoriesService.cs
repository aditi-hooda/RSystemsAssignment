using Microsoft.Extensions.Caching.Memory;
using System.Text.Json;
using HackerNewsAPI.Models;

namespace HackerNewsAPI.Services
{
    public class StoriesService : IStoriesService
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IMemoryCache _cache;

        public StoriesService(IHttpClientFactory httpClientFactory, IMemoryCache cache)
        {
            _httpClientFactory = httpClientFactory;
            _cache = cache;
        }

        public async Task<List<Story>> GetNewestStoriesAsync(int pageSize, int pageNumber)
        {
            try
            {
                // Check cache first
                string cacheKey = $"NewestStories_{pageSize}_{pageNumber}";
                if (_cache.TryGetValue(cacheKey, out List<Story> stories))
                {
                    return stories;
                }

                // Fetch data from Hacker News API
                var httpClient = _httpClientFactory.CreateClient("HackerNewsAPI");
                var response = await httpClient.GetAsync($"newstories.json?print=pretty");

                if (response.IsSuccessStatusCode)
                {
                    var storyIds = await JsonSerializer.DeserializeAsync<List<int>>(await response.Content.ReadAsStreamAsync());
                    var limitedIds = storyIds.Skip((pageNumber - 1) * pageSize).Take(pageSize);
                    stories = new List<Story>();

                    foreach (var id in limitedIds)
                    {
                        var storyResponse = await httpClient.GetAsync($"item/{id}.json?print=pretty");
                        if (storyResponse.IsSuccessStatusCode)
                        {
                            var story = await JsonSerializer.DeserializeAsync<Story>(await storyResponse.Content.ReadAsStreamAsync());
                            if (story != null)
                            {
                                story.postedOn = new DateTime(Convert.ToInt64(story.time)).ToString("dddd, dd MMMM yyyy");
                                stories.Add(story);
                            }
                        }
                    }

                    // Cache the result for future requests
                    _cache.Set(cacheKey, stories, TimeSpan.FromMinutes(10)); // Cache for 10 minutes
                }

                return stories;
            }
            catch (Exception ex)
            {
                throw new Exception("Error occurred while fetching newest stories", ex);
            }
        }

        public List<Story> SearchStoriesAsync(string query, int pageSize = 10, int pageNumber = 1)
        {
            // Implement search functionality
            try
            {
                List<Story> queriedStories = new();
                for (int index = pageNumber; index > 0; index--)
                {
                    string cacheKey = $"NewestStories_{pageSize}_{index}";
                    if (_cache.TryGetValue(cacheKey, out List<Story> stories))
                    {
                        var filterQuery = stories.Where(s => s.title.Contains(query, StringComparison.InvariantCultureIgnoreCase)).ToList();
                        queriedStories.AddRange(filterQuery);
                    }
                }
                return queriedStories;
            }
            catch (Exception ex)
            {
                throw new Exception("Error occurred while searching stories", ex);
            }
        }
    }

}
