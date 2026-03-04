import { useState } from "react";
import "./App.css";

interface SearchErrors {
  from?: string;
  to?: string;
  departDate?: string;
}

interface SubscribeErrors {
  email?: string;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function SearchForm() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [passengers, setPassengers] = useState("1");
  const [errors, setErrors] = useState<SearchErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): SearchErrors => {
    const newErrors: SearchErrors = {};
    if (!from.trim()) newErrors.from = "Please enter a departure city.";
    if (!to.trim()) newErrors.to = "Please enter a destination city.";
    if (!departDate) newErrors.departDate = "Please select a departure date.";
    if (from.trim() && to.trim() && from.trim().toLowerCase() === to.trim().toLowerCase()) {
      newErrors.to = "Destination must be different from departure city.";
    }
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitted(false);
    } else {
      setErrors({});
      setSubmitted(true);
    }
  };

  return (
    <section className="hero-section">
      <h2>Find Your Flights</h2>
      {submitted && (
        <p className="success-message">
          Searching for flights from {from} to {to} on {departDate} for {passengers} passenger(s)!
        </p>
      )}
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="from">From</label>
          <input
            id="from"
            type="text"
            placeholder="Departure city"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className={errors.from ? "input-error" : ""}
          />
          {errors.from && <span className="error-message">{errors.from}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="to">To</label>
          <input
            id="to"
            type="text"
            placeholder="Destination city"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className={errors.to ? "input-error" : ""}
          />
          {errors.to && <span className="error-message">{errors.to}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="departDate">Departure Date</label>
          <input
            id="departDate"
            type="date"
            value={departDate}
            onChange={(e) => setDepartDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className={errors.departDate ? "input-error" : ""}
          />
          {errors.departDate && <span className="error-message">{errors.departDate}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="passengers">Passengers</label>
          <select
            id="passengers"
            value={passengers}
            onChange={(e) => setPassengers(e.target.value)}
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={String(n)}>{n}</option>
            ))}
          </select>
        </div>
        <button type="submit">Search Flights</button>
      </form>
    </section>
  );
}

function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string>("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubscribed(true);
    setEmail("");
  };

  return (
    <section className="subscribe-section">
      <h2>Get the Best Flight Deals</h2>
      <p>Subscribe to our newsletter and never miss a deal!</p>
      {subscribed ? (
        <p className="success-message">Thank you for subscribing! Check your inbox for deals.</p>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="subscribeEmail">Email Address</label>
            <input
              id="subscribeEmail"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError("");
              }}
              className={error ? "input-error" : ""}
            />
            {error && <span className="error-message">{error}</span>}
          </div>
          <button type="submit">Subscribe</button>
        </form>
      )}
    </section>
  );
}

function App() {
  return (
    <div className="App">
      <header className="navbar">
        <h1>FickleFlight</h1>
      </header>
      <main>
        <SearchForm />
        <SubscribeForm />
      </main>
    </div>
  );
}

export default App;,
  useNavigationType,
  useLocation, Popup from "./components/Portal";;Popup";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag: HTMLMetaElement | null = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<PortalPopup />} />
    Routes>
  );
}
export default App;
