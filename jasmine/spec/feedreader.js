/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is the first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.*/
    describe('RSS Feeds', function() {

        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.*/

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This is the test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.*/
        it('urls are defined', function() {
            allFeeds.forEach(function(allFeeds) {
                expect(allFeeds.url).toBeDefined();
                expect(allFeeds.url.length).not.toBe(0);
            });
        });

        /* This is the test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.*/
        it('names are defined', function() {
            allFeeds.forEach(function(allFeeds) {
                expect(allFeeds.name).toBeDefined();
                expect(allFeeds.name.length).not.toBe(0);
            });
        });
    });


    /* This is the test suite named "The menu" */
    describe('The menu', function() {

        /* This is the test that ensures the menu element is
         * hidden by default.*/
        it('hides menu element', function() {
            expect(document.body.className).toContain("menu-hidden");
        });

        /* This test ensures the menu changes
         * visibility when the menu icon is clicked.*/
        it('shows and hides menu on clicking menu icon', function() {
            var menuicon = $('a.menu-icon-link');
            menuicon.click();
            //shows menu icon on click
            expect(document.body.className).not.toContain("menu-hidden");
            //hides menu icon on clicking again
            menuicon.click();
            expect(document.body.className).toContain("menu-hidden");
        });
    });



    /* Another test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        var originalTimeout;
        beforeEach(function(done) {
            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
            loadFeed(0, done);
        });

        /* This test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.*/

        it('has atleast a single .entry element within the .feed container', function() {
            var entrylen = $('.feed .entry').length;
            console.log(entrylen);
            expect(entrylen).not.toBe(0);
        });

        afterEach(function() {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });
    });

    /* New test suite named "New Feed Selection"*/
    describe('New Feed Selection', function() {

        var content1, content2;
        /* This test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.*/         
        it('new feed is loaded', function(done) {
            loadFeed(0, function() {
                content1 = $('.feed').html();
                loadFeed(1, function() {
                    content2 = $('.feed').html();
                });
                expect(content1).not.toEqual(content2);
                done();
            });            
        });
    });
}());