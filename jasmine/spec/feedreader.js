/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

function hasClass(obj, cls) {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

function notEmpty(data) {
    expect(data).not.toBe(0);
}

$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            notEmpty(allFeeds.length);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('allFeeds ensures it has a URL', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeDefined();
                var regularExpressionUrl = /^((ht|f)tps?):\/\/([\w\-]+(\.[\w\-]+)*\/)*[\w\-]+(\.[\w\-]+)*\/?(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?/;
                expect(feed.url).toMatch(regularExpressionUrl);
            });
        });



        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('allFeeds ensures it has a name', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.name).toBeDefined();
                notEmpty(feed.name.length);
            });
        });

    });


    /* TODO: Write a new test suite named "The menu" */
    describe("The menu", function () {

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('this function is ensures the element is hidden by default and showing or hiding', function () {
            expect(hasClass(document.querySelector('body'), 'menu-hidden')).not.toBe(false);
        });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('this function is ensures the menu changes', function () {
            var menuIcon = $('.menu-icon-link');
            for (var i = 0; i < 2; i++) {
                menuIcon.click();
            }
            expect(hasClass(document.querySelector('body'), 'menu-hidden')).not.toBe(true);
        });
    });



    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function () {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function (done) {
            loadFeed(1, done);
        });

        it('this function is ensures when the loadFeed called , at least a single element', function () {
            var feedList = $('.feed-list');
            expect(feedList.length).toBeGreaterThanOrEqual(1);
        });

    });


    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function () {

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var previousT, afterT;
        var getHtml = ()=>{
            let h = $('.header-title')[0].innerHTML;
            return h;
        };
       
        beforeEach((done)=>{
            loadFeed(1, ()=>{
                previousT = getHtml();
                loadFeed(2, ()=>{
                    afterT = getHtml();
                    done();
                });
            });
        })

        it('this function is ensures when a new feed is loaded the content actually changes', function () {
            expect(previousT).not.toContain(afterT);
        });
    });

}());
