const waitFor = (selector) => {
	return new Promise((resolve, reject) => {
		const interval = setInterval(() => {
			if (document.querySelector(selector)) {
				clearInterval(interval);
				clearTimeout(timeout);
				resolve();
			}
		}, 30);

		const timeout = setTimeout(() => {
			clearInterval(interval);
			reject();
		}, 2000);
	});
};

beforeEach(() => {
	document.querySelector("#target").innerHTML = "";
	createAutoComplete({
		root: document.querySelector("#target"),
		fetchData() {
			return [
				{ Title: "Avengers" },
				{ Title: "Not Avengers" },
				{ Title: "Some other movie" },
			];
		},
		renderOption(movie) {
			return movie.Title;
		},
	});
});

it("Dropdown starts closed", () => {
	const drpodown = document.querySelector(".dropdown");

	expect(drpodown.className).not.to.include("is-active");
});

it("After serching dropdown opens up", async () => {
	//type something in
	const input = document.querySelector("input");
	input.value = "avengers";
	input.dispatchEvent(new Event("input"));

	await waitFor(".dropdown-item");
	//check dropdown
	const drpodown = document.querySelector(".dropdown");

	expect(drpodown.className).to.include("is-active");
});

it("After serching, displays some results", async () => {
	const input = document.querySelector("input");
	input.value = "avengers";
	input.dispatchEvent(new Event("input"));

	await waitFor(".dropdown-item");

	const items = document.querySelectorAll(".dropdown-item");

	expect(items.length).to.equal(3);
});
