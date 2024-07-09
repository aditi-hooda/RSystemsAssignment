using HackerNewsAPI.Controllers;
using HackerNewsAPI.Models;
using HackerNewsAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HackerNewsAPI_Test
{
    [TestFixture]
    public class StoriesControllerTests
    {
        private StoriesController _controller;
        private Mock<IStoriesService> _mockHackerNewsService;

        [SetUp]
        public void Setup()
        {
            _mockHackerNewsService = new Mock<IStoriesService>();
            _controller = new StoriesController(_mockHackerNewsService.Object);
        }

        [Test]
        public async Task GetNewestStories_ReturnsOkObjectResult()
        {
            // Arrange
            var expectedStories = new List<Story>
            {
                new Story { title= "Dummy Story 1", url = "dummyUrl1", by="dummyAuthor1",time=0,postedOn="dummyDate1" },
                new Story { title= "Dummy Story 2", url = "dummyUrl2", by="dummyAuthor2",time=0,postedOn="dummyDate2" }

            };
            _mockHackerNewsService.Setup(s => s.GetNewestStoriesAsync(It.IsAny<int>(), It.IsAny<int>())).ReturnsAsync(expectedStories);

            // Act
            var result = await _controller.GetNewestStories();

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result.Result);
            var okResult = result.Result as OkObjectResult;
            Assert.IsInstanceOf<List<Story>>(okResult.Value);
            var stories = okResult.Value as List<Story>;
            Assert.That(stories.Count, Is.EqualTo(expectedStories.Count));
            Assert.That(stories[0].title, Is.EqualTo(expectedStories[0].title));
            Assert.That(stories[1].url, Is.EqualTo(expectedStories[1].url));
        }
        [Test]
        public async Task GetNewestStories_Exception_ReturnsStatusCode500()
        {
            // Arrange
            _mockHackerNewsService.Setup(s => s.GetNewestStoriesAsync(It.IsAny<int>(), It.IsAny<int>())).ThrowsAsync(new Exception("Simulated exception"));

            // Act
            var result = await _controller.GetNewestStories();

            // Assert
            Assert.IsInstanceOf<ObjectResult>(result.Result);
            var statusCodeResult = result.Result as ObjectResult;
            Assert.That(statusCodeResult.StatusCode, Is.EqualTo(500));
            Assert.That(statusCodeResult.Value, Is.EqualTo("Simulated exception"));
        }

        [Test]
        public async Task SearchStories_ReturnsOkObjectResult()
        {
            // Arrange
            var query = "dummy";
            var expectedStories = new List<Story>
            {
                new Story { title= "Dummy Story 1", url = "dummyUrl1", by="dummyAuthor1",time=0,postedOn="dummyDate1" },
                new Story { title= "Dummy Story 2", url = "dummyUrl2", by="dummyAuthor2",time=0,postedOn="dummyDate2" }

            };
            _mockHackerNewsService.Setup(s => s.SearchStoriesAsync(query, It.IsAny<int>(), It.IsAny<int>())).Returns(expectedStories);

            // Act
            var result = _controller.SearchStories(query);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result.Result);
            var okResult = result.Result as OkObjectResult;
            Assert.IsInstanceOf<List<Story>>(okResult.Value);
            var stories = okResult.Value as List<Story>;
            Assert.That(stories.Count, Is.EqualTo(expectedStories.Count));
            Assert.That(stories[0].title, Is.EqualTo(expectedStories[0].title));
            Assert.That(stories[1].url, Is.EqualTo(expectedStories[1].url));
        }
        [Test]
        public void SearchStories_Exception_ReturnsStatusCode500()
        {
            // Arrange
            var query = "test";
            _mockHackerNewsService.Setup(s => s.SearchStoriesAsync(query, It.IsAny<int>(), It.IsAny<int>())).Throws(new Exception("Simulated exception"));

            // Act
            var result = _controller.SearchStories(query);

            // Assert
            Assert.IsInstanceOf<ObjectResult>(result.Result);
            var statusCodeResult = result.Result as ObjectResult;
            Assert.That(statusCodeResult.StatusCode, Is.EqualTo(500));
            Assert.That(statusCodeResult.Value, Is.EqualTo("Simulated exception"));
        }
    }
}
