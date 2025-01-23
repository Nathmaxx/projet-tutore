import React, { useEffect } from 'react';
import p5 from 'p5';

const BackgroundAnimation = () => {
    useEffect(() => {
        let myP5;

        const sketch = (p) => {
            let c;
            let sp = [];
            let cnt = 0;
            let t = 0;
            let playB = true;
            let a, b, r1, g1, b1;

            p.setup = () => {
                a = p.random(0.01, 0.2);
                b = p.random(0.2, 0.9);
                c = p.min(p.windowWidth, p.windowHeight) * 0.9;
                p.createCanvas(c, c);
                initP(p.int(p.random(100, 500)));
                r1 = p.random(50, 120);
                g1 = p.random(50, 150);
                b1 = p.random(80, 220);
                p.strokeWeight(0.5);
                p.frameRate(30);
            };

            p.draw = () => {
                if (playB) {
                    cnt++;
                    t = p.sin(cnt / 500);
                    p.translate(c / 2, c / 2);
                    p.background(r1, g1, b1, 15 - t);
                    for (let j = 0; j < 1; j++) {
                        for (let i = 0; i < sp.length; i++) {
                            let n = p.noise(sp[i].x * a, sp[i].y * a) * p.TWO_PI;
                            sp[i].add(p.cos(n * b / (t % 5 + 1)), p.sin(n * b / (t % 5 + 1)));
                            let px = p.constrain(sp[i].x, -c / 2.5, c / 2.5);
                            let py = p.constrain(sp[i].y, -c / 2.5, c / 2.5);
                            if (p.abs(px) === c / 2.5 || p.abs(py) === c / 2.5) {
                                let x = p.random(-c / 2, c / 2);
                                let y = p.random(-c / 2, c / 2);
                                sp[i] = p.createVector(x, y);
                                if (p.frameCount === 20) {
                                    a = p.random(0.01, 0.2);
                                    b = p.random(0.2, 0.9);
                                }
                            }
                            let pxr = p.round(px / 10) * 10;
                            let pyr = p.round(py);
                            p.stroke(
                                225 - r1 * p.sin(i + t / 4),
                                285 - g1 * p.sin(i + t / 4),
                                355 - b1 * p.sin(i + t / 4)
                            );
                            p.point(pxr, -pyr);
                            p.point(-pxr, -pyr);
                            p.point(pyr, pxr);
                            p.point(-pyr, pxr);
                            p.point(px, -py);
                            p.point(-px, -py);
                            p.point(py, px);
                            p.point(-py, px);
                        }
                    }
                }
            };

            const initP = (n2) => {
                for (let i = 0; i < n2; i++) {
                    let x = p.random(-c / 2, c / 2);
                    let y = p.random(-c / 2, c / 2);
                    sp[i] = p.createVector(x, y);
                }
            };

            p.keyPressed = () => {
                if (p.keyCode === 32) {
                    sp = [];
                    p.background(0);
                    p.setup();
                    p.draw();
                }
            };

            p.mousePressed = () => {
                playB = !playB;
            };
        };

        myP5 = new p5(sketch);

        return () => {
            myP5.remove();
        };
    }, []);

    return <div />;
};

export default BackgroundAnimation;