using HackerNewsAPI.Models;
using HackerNewsAPI.Services;
using Microsoft.Extensions.Caching.Memory;
using Moq.Protected;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json;

namespace HackerNewsAPI_Test
{
    [TestFixture]
    public class HackerNewsServiceTests
    {
        private StoriesService _hackerNewsService;
        private Mock<IHttpClientFactory> _mockHttpClientFactory;
        private IMemoryCache _cacheMock;

        [SetUp]
        public void Setup()
        {
            _mockHttpClientFactory = new Mock<IHttpClientFactory>();
            _cacheMock = new MemoryCache(new MemoryCacheOptions());

            _hackerNewsService = new StoriesService(_mockHttpClientFactory.Object, _cacheMock);
        }
        [Test]
        public async Task GetNewestStoriesAsync_ReturnsStories_FromCache()
        {
            // Arrange
            var pageSize = 5;
            var pageNumber = 1;
            var cacheKey = $"NewestStories_{pageSize}_{pageNumber}";
            var expectedStories = new List<Story>
            {
                new Story { title= "Dummy Story 1", url = "dummyUrl1", by="dummyAuthor1",time=0,postedOn="dummyDate1" },
                new Story { title= "Dummy Story 2", url = "dummyUrl2", by="dummyAuthor2",time=0,postedOn="dummyDate2" }

            };
            _cacheMock.Set(cacheKey, expectedStories);

            // Act
            var result = await _hackerNewsService.GetNewestStoriesAsync(pageSize, pageNumber);

            // Assert
            Assert.AreEqual(expectedStories, result);
        }
        [Test]
        public async Task GetNewestStoriesAsync_ThrowsException()
        {
            // Arrange
            var pageSize = 5;
            var pageNumber = 1;
            var expectedStories = new List<Story>
            {
                new Story { title= "Dummy Story 1", url = "dummyUrl1", by="dummyAuthor1",time=0,postedOn="dummyDate1" },
                new Story { title= "Dummy Story 2", url = "dummyUrl2", by="dummyAuthor2",time=0,postedOn="dummyDate2" }

            };
            // Act
            Exception ex = Assert.ThrowsAsync<Exception>(async () => await _hackerNewsService.GetNewestStoriesAsync(pageSize, pageNumber));

            // Assert
            Assert.IsNotNull(ex);
            Assert.That(ex.Message, Is.EqualTo("Error occurred while fetching newest stories"));
        }

        [Test]
        public void SearchStoriesAsync_ReturnsFilteredStories()
        {
            // Arrange
            var query = "test";
            var pageSize = 10;
            var pageNumber = 1;
            var cachedStories = new List<Story>
            {
                new Story { title= "Dummy test Story 1", url = "dummyUrl1", by="dummyAuthor1",time=0,postedOn="dummyDate1" },
                new Story { title= "Dummy Story 2", url = "dummyUrl2", by="dummyAuthor2",time=0,postedOn="dummyDate2" }

            };
            var cacheKey = $"NewestStories_{pageSize}_{pageNumber}";
            _cacheMock.Set(cacheKey, cachedStories);

            // Act
            var result = _hackerNewsService.SearchStoriesAsync(query, pageSize, pageNumber);

            // Assert
            Assert.IsNotNull(result);
            Assert.That(result.Count, Is.EqualTo(1)); // Assuming only one story matches the query "test"
            Assert.That(result[0].title, Is.EqualTo("Dummy test Story 1"));
        }
        [Test]
        public void SearchStoriesAsync_ThrowsException()
        {
            // Arrange
            string query = null;
            var pageSize = 10;
            var pageNumber = 1;
            var cachedStories = new List<Story>
            {
                new Story { title= "Dummy test Story 1", url = "dummyUrl1", by="dummyAuthor1",time=0,postedOn="dummyDate1" },
                new Story { title= "Dummy Story 2", url = "dummyUrl2", by="dummyAuthor2",time=0,postedOn="dummyDate2" }

            };
            var cacheKey = $"NewestStories_{pageSize}_{pageNumber}";
            _cacheMock.Set(cacheKey, cachedStories);

            // Act
            Exception ex = Assert.Throws<Exception>(() => _hackerNewsService.SearchStoriesAsync(query, pageSize, pageNumber));

            // Assert
            Assert.IsNotNull(ex);
            Assert.That(ex.Message, Is.EqualTo("Error occurred while searching stories"));
        }
    }
}
