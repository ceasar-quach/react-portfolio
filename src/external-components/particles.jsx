import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useEffect, useState, useMemo } from "react";

export default function ParticlesWrapper () {
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
            // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
            // starting from v2 you can add only the features you need reducing the bundle size
            //await loadAll(engine);
            //await loadFull(engine);
            await loadSlim(engine);
            //await loadBasic(engine);
        }).then(() => {
            setInit(true);
        });
        }, []);
    const [init, setInit] = useState(false);
    const options = useMemo(
    () => ({
        background: {
        color: {
            value: "",
        },
        },
        fpsLimit: 120,
        interactivity: {
        events: {
            onClick: {
            enable: false,
            mode: "push",
            },
            onHover: {
            enable: true,
            mode: "connect",
            },
        },
        modes: {
            push: {
            quantity: 4,
            },
            repulse: {
            distance: 200,
            duration: 0.4,
            },
        },
        },
        particles: {
        color: {
            value: "#ffffff",
        },
        links: {
            color: "#ffffff",
            distance: 100,
            enable: true,
            opacity: 0.8,
            width: 1,
        },
        move: {
            direction: "none",
            enable: true,
            outModes: {
            default: "bounce",
            },
            random: true,
            speed: 1,
            straight: false,
        },
        number: {
            density: {
            enable: true,
            },
            value: 120,
        },
        opacity: {
            value: 0.2,
        },
        shape: {
            type: "circle",
        },
        size: {
            value: { min: 1, max: 5 },
        },
        },
        detectRetina: true,
    }),
    [],
    );

    return(
        init&&      
        <Particles
        id="tsparticles"
        options={options}
        />
    )
}