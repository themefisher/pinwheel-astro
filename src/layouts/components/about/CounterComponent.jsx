import { useEffect } from 'react';

const CounterComponent = ({ counter }) => {

  useEffect(() => {
    const counters = document.querySelectorAll(".count");
    const speed = 700;
    counters.forEach((counter) => {
      const animate = () => {
        const value = +counter.getAttribute("aria-valuenow");
        const data = +counter.innerText;

        const time = value / speed;
        if (data < value) {
          counter.innerText = Math.ceil(data + time);
          setTimeout(animate, 1);
        } else {
          counter.innerText = value;
        }
      };

      animate();
    });
  }, []);

  return (
    <div className="counter mt-16">
      <div className="row mx-0 rounded-[20px] bg-white px-10 shadow-lg lg:py-10">
        {
          counter.map((item, index) => (
            <div key={index} className="border-border sm:col-6 lg:col-3 px-10 py-10 text-center lg:border-r lg:py-0 last:lg:border-none">
              <h2>
                <span className="count" aria-valuenow={item.number}>
                  0
                </span>
                <span
                  className="text-primary"
                  style={{
                    color: item.color,
                  }}
                >
                  +
                </span>
              </h2>
              <p>{item.name}</p>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default CounterComponent;
