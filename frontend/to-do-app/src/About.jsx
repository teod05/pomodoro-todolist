function About() {
    return (
        <div className="about-container">
            <h1>About This App</h1>
            <div className="about-content">
                <section>
                    <h2>What is this app?</h2>
                    <p>
                        This is a productivity application that combines a to-do list with a Pomodoro timer.
                        It helps you manage your tasks and maintain focus using the Pomodoro technique.
                    </p>
                </section>

                <section>
                    <h2>Features</h2>
                    <ul>
                        <li>To-Do List: Add, delete, and manage your tasks</li>
                        <li>Pomodoro Timer: Customizable work and break periods</li>
                        <li>Simple and intuitive interface</li>
                        <li>Focus on productivity</li>
                    </ul>
                </section>

                <section>
                    <h2>Disclaimer</h2>
                    <p>This a public to-do list app. Any data you add can be seen by other users. Inappropriate content is strictly prohibited.</p>
                </section>

                <section>
                    <h2>Version</h2>
                    <p>Current Version: 1.0.0</p>
                </section>

               
            </div>
        </div>
    );
}

export default About; 