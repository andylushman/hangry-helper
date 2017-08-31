var Nightmare = require("nightmare");
var expect = require("chai").expect;


describe("Load Pages", function(){
	this.timeout(10000)


	describe("/ home page", () => {
		it('should home page', done => {
			 Nightmare({ show: true })
			 .goto("http://localhost:8080/")
			 .end()
			 .then(function (result) {done() })
			 .catch(done)
		})
	})
	describe("/favs", () => {	
		it("load favs page", done => {
			 Nightmare({ show: true })
			 .goto("http://localhost:8080/")
			 .end()
			 .then(function (result) {done() })
			 .catch(done)
		})
	})

});

describe("using the app", function(){
	this.timeout(10000)

	describe("favs button", () => {
		it("should press favs button and get results", done => {
			Nightmare({show: true })
			.goto("http://localhost:8080/")
			.wait("#myFav")
			.click("#myFav")
			.wait(".card-title")
			.end()
			.then(result => { done() })
			.catch(done)
		})
	})

})