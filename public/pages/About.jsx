const { useRef, useState } = React
const { Outlet, NavLink } = ReactRouterDOM
// const { PropTypes } = PropTypes

import { utilService } from '../services/util.service.js'
import { AboutTeam } from '../cmps/AboutTeam.jsx'
import { AboutVision } from '../cmps/AboutVision.jsx'

export function About() {
    const titleRef = useRef()
    const count = 1000001

    function onViewMore() {
        alert('curiosity killed the cat')
    }
    return (
        <section className="about container mt-5">
            <h1 ref={titleRef} className="text-center mb-4">About Todos and Us...</h1>
            <p className="text-muted mb-4">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio dolore sapiente, iste animi corporis nisi atque tempora assumenda dolores. Nobis nam dolorem rerum illo facilis nemo sit voluptatibus laboriosam necessitatibus!
            </p>

            <div className="text-center mb-4">
                <button className="btn btn-outline-primary btn-sm" onClick={() => utilService.animateCSS(titleRef.current)}>
                    Animate
                </button>
            </div>

            <nav className="text-center mb-4">
                <NavLink to="/about/team" className="text-decoration-none mx-2">Team</NavLink> |
                <NavLink to="/about/vision" className="text-decoration-none mx-2">Vision</NavLink>
            </nav>

            <section className="mb-4">
                <Outlet />
            </section>

            <hr className="my-4" />

            <ul className="list-unstyled text-center">
                {['Ja', 'Ka', 'La'].map((name, index) => (
                    <React.Fragment key={index}>
                        <li className="mb-1">{name}</li>
                        {index < 2 && <li className="divider text-muted">---</li>}
                    </React.Fragment>
                ))}
            </ul>

            <hr className="my-4" />

            <div className="text-center mb-4">
                <FancyBox title="Hola!" onClose={() => console.log('ok, closing')}>
                    <h3 className="mb-2">{count.toLocaleString()} Followers</h3>
                    <button className="btn btn-info btn-sm" onClick={onViewMore}>Tell me More</button>
                </FancyBox>
            </div>

            <hr className="my-4" />

            <h3 className="text-center mb-3">Click to Resize:</h3>
            <div className="d-flex justify-content-center">
                <SplitPane
                    left={<AboutTeam />}
                    right={<AboutVision />}
                />
            </div>

            <hr className="my-4" />
        </section>

    )
}

function FancyBox({ title = 'Hello', onClose, children }) {
    return <div className="fancy-box">
        <button style={{ float: 'right' }} onClick={onClose}>x</button>
        <h3>{title}</h3>
        {children}
    </div>
}

FancyBox.propTypes = {
    onClose: PropTypes.func.isRequired
}

function SplitPane(props) {

    const [width, setWidth] = useState(30)

    return (
        <div className="split-pane" style={{
            display: 'flex'
        }}>
            <div style={{ width: width + '%' }} onClick={() => {
                if (width + 10 <= 100) setWidth(width + 10)
            }}>
                {props.left}
            </div>
            <div style={{ flex: 1 }} onClick={() => {
                if (width > 10) setWidth(width - 10)
            }}>
                {props.right}
            </div>
        </div>
    )
}



const Title = (props) => <h1>Title: {props.txt}</h1>

Title.propTypes = {
    txt(props, propName, componentName) {
        if (!(propName in props)) {
            throw new Error(`missing ${propName}`)
        }
        if (props[propName].length < 6) {
            throw new Error(`${propName} was too short`)
        }
    }
}
