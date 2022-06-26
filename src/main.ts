import { WebGLCanvas } from "./webgl_canvas";

let webglCanvas = new WebGLCanvas("#main_canvas");
let canvas = webglCanvas.canvas;
let gl = webglCanvas.gl;

let vertexSource: string = `
    attribute vec4 a_position;

    void main() {
        gl_Position = a_position;
    }
`;

let fragmentSource: string = `
    precision mediump float;
    uniform vec3 color;

    void main() {
        gl_FragColor = vec4(color, 1);
    }
`;

let program: WebGLProgram = webglCanvas.createProgram(vertexSource, fragmentSource);
let positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
let positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

let positions = [
    0, 0,
    0, 0.5,
    0.7, 0,
];
gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(positions),
    gl.STATIC_DRAW
);

// Clear
gl.viewport(0, 0, canvas.width, canvas.height);
gl.clearColor(0, 0, 0, 0);
gl.clear(gl.COLOR_BUFFER_BIT);

// Set Program
gl.useProgram(program);
gl.enableVertexAttribArray(positionAttributeLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
{
    let size = 2;          // 반복마다 2개의 컴포넌트
    let type = gl.FLOAT;   // 데이터는 32비트 부동 소수점
    let normalize = false; // 데이터 정규화 안 함
    let stride = 0;        // 0 = 다음 위치를 가져오기 위해 반복마다 size * sizeof(type) 만큼 앞으로 이동
    let offset = 0;        // 버퍼의 처음부터 시작
    gl.vertexAttribPointer(
        positionAttributeLocation,
        size,
        type,
        normalize,
        stride,
        offset
    );
}

// Get Uniform
const colors: Float32Array[] = [
    new Float32Array([0, 0, 1]),
    new Float32Array([0, 1, 0]),
    new Float32Array([1, 0, 0]),
];
let currentColorIndex = 0;

let colorLocation = gl.getUniformLocation(program, 'color');
gl.uniform3fv(colorLocation, colors[currentColorIndex]);

// Render
function render() {
    const primitiveType = gl.TRIANGLES;
    const offset = 0;
    const count = 3;
    gl.drawArrays(primitiveType, offset, count);

    currentColorIndex = (currentColorIndex + 1) % 3;
    gl.uniform3fv(colorLocation, colors[currentColorIndex]);
    setTimeout(requestAnimationFrame, 500, render);
}

render();