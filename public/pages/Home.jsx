import { ToggleButton } from "../cmps/ToggleButton.jsx"

const { useState } = React

export function Home() {
    
    const [isOn, setIsOn] = useState(false)

    return (
        <section className="home py-5">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6 mb-4 mb-lg-0">
                        <div className="text-center text-lg-start">
                            <h1 className="display-4 fw-bold text-primary mb-3">
                                Todo's R Us!
                                <span className="text-warning ms-2">✓</span>
                            </h1>
                            <p className="lead text-muted mb-4">
                                Organize your tasks, boost your productivity, and never miss a deadline again.
                                Simple, efficient, and designed for you.
                            </p>
                            <div className="d-flex justify-content-center justify-content-lg-start gap-3">
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        role="switch"
                                        id="showImage"
                                        checked={isOn}
                                        onChange={(e) => setIsOn(e.target.checked)}
                                        style={{ width: '3rem', height: '1.5rem' }}
                                    />
                                    <label className="form-check-label" htmlFor="showImage">
                                        Show Preview
                                    </label>
                                </div>
                                <button className="btn btn-primary btn-lg">
                                    Get Started
                                    <i className="bi bi-arrow-right ms-2"></i>
                                </button>
                            </div>
                            
                            {/* Feature List */}
                            <div className="row mt-5">
                                <div className="col-md-6">
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="feature-icon bg-primary bg-gradient p-2 rounded-circle text-white me-3">
                                            <i className="bi bi-check2-circle"></i>
                                        </div>
                                        <div>
                                            <h5 className="mb-0">Easy to Use</h5>
                                            <small className="text-muted">Intuitive interface</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="feature-icon bg-success bg-gradient p-2 rounded-circle text-white me-3">
                                            <i className="bi bi-clock-history"></i>
                                        </div>
                                        <div>
                                            <h5 className="mb-0">Track Progress</h5>
                                            <small className="text-muted">Monitor completion</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="feature-icon bg-info bg-gradient p-2 rounded-circle text-white me-3">
                                            <i className="bi bi-cloud-check"></i>
                                        </div>
                                        <div>
                                            <h5 className="mb-0">Cloud Sync</h5>
                                            <small className="text-muted">Access anywhere</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="feature-icon bg-warning bg-gradient p-2 rounded-circle text-white me-3">
                                            <i className="bi bi-bell"></i>
                                        </div>
                                        <div>
                                            <h5 className="mb-0">Reminders</h5>
                                            <small className="text-muted">Never miss a task</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-lg-6">
                        <div className="position-relative">
                            {isOn && (
                                <div className="image-container">
                                    <img 
                                        src="../assets/img/todo.png" 
                                        alt="Todo App Preview" 
                                        className="img-fluid rounded-4 shadow-lg"
                                        style={{
                                            opacity: 0,
                                            animation: 'fadeIn 0.5s ease-in forwards'
                                        }}
                                    />
                                    {/* Decorative Elements */}
                                    <div className="position-absolute top-0 end-0 translate-middle-y">
                                        <div className="bg-primary rounded-circle" style={{ width: '120px', height: '120px', opacity: 0.1 }}></div>
                                    </div>
                                    <div className="position-absolute bottom-0 start-0 translate-middle">
                                        <div className="bg-warning rounded-circle" style={{ width: '80px', height: '80px', opacity: 0.1 }}></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="row mt-5 py-4 border-top">
                    <div className="col-md-3 col-6 text-center mb-3 mb-md-0">
                        <h2 className="text-primary fw-bold">10k+</h2>
                        <p className="text-muted mb-0">Active Users</p>
                    </div>
                    <div className="col-md-3 col-6 text-center mb-3 mb-md-0">
                        <h2 className="text-primary fw-bold">50k+</h2>
                        <p className="text-muted mb-0">Tasks Completed</p>
                    </div>
                    <div className="col-md-3 col-6 text-center">
                        <h2 className="text-primary fw-bold">99%</h2>
                        <p className="text-muted mb-0">Satisfaction</p>
                    </div>
                    <div className="col-md-3 col-6 text-center">
                        <h2 className="text-primary fw-bold">24/7</h2>
                        <p className="text-muted mb-0">Support</p>
                    </div>
                </div>
            </div>

           
        </section>
    )
}