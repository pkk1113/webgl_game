export class WebGLCanvas {
    canvas: HTMLCanvasElement;
    gl: WebGLRenderingContext;

    constructor(canvas_selector: string) {
        this.canvas = document.querySelector(canvas_selector)!;
        if (this.canvas == null) {
            throw new Error("there is no canvas of canvas_id");
        }

        this.gl = this.canvas.getContext("webgl")!;
        if (this.gl == null) {
            throw new Error("there is no webgl context");
        }
    }

    private createShader(type: GLenum, source: string): WebGLShader | null {
        let shader = this.gl.createShader(type)!;
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);

        let success = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
        if (!success) {
            console.log(this.gl.getShaderInfoLog(shader));
            this.gl.deleteShader(shader);
            return null;
        }

        return shader;
    }

    createProgram(vertexSource: string, fragmentSource: string): WebGLProgram | null {
        let program = this.gl.createProgram()!;

        let vs = this.createShader(this.gl.VERTEX_SHADER, vertexSource);
        this.gl.attachShader(program, vs!);

        let fs = this.createShader(this.gl.FRAGMENT_SHADER, fragmentSource);
        this.gl.attachShader(program, fs!);

        this.gl.linkProgram(program);
        let success = this.gl.getProgramParameter(program, this.gl.LINK_STATUS);

        if (vs) {
            this.gl.detachShader(program, vs!);
            this.gl.deleteShader(vs!);
        }

        if (fs) {
            this.gl.detachShader(program, fs!);
            this.gl.deleteShader(fs!);
        }

        if (!success) {
            console.log(this.gl.getProgramInfoLog(program));
            this.gl.deleteProgram(program);
            return null;
        }

        return program;
    }
}
