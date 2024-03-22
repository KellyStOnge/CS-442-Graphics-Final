
const VERTEX_STRIDE = 36;


class UvMesh {
    /** 
     * Creates a new mesh and loads it into video memory.
     * 
     * @param {WebGLRenderingContext} gl  
     * @param {number} program
     * @param {number[]} vertices
     * @param {number[]} indices
    */
    constructor( gl, program, vertices, indices, material ) {
        this.verts = create_and_load_vertex_buffer( gl, vertices, gl.STATIC_DRAW );
        this.indis = create_and_load_elements_buffer( gl, indices, gl.STATIC_DRAW );

        this.n_verts = vertices.length;
        this.n_indis = indices.length;
        this.program = program;
        this.material = material;
    }

    set_vertex_attributes() {
        set_vertex_attrib_to_buffer( 
            gl, this.program, 
            "coordinates", 
            this.verts, 3, 
            gl.FLOAT, false, VERTEX_STRIDE, 0 
        );

        set_vertex_attrib_to_buffer( 
            gl, this.program, 
            "color", 
            this.verts, 4, 
            gl.FLOAT, false, VERTEX_STRIDE, 12
        );

        set_vertex_attrib_to_buffer( 
            gl, this.program,
            "uv",
            this.verts, 2,
            gl.FLOAT, false, VERTEX_STRIDE, 28
        );

    }
    

    /**
     * Create a box mesh with the given dimensions and colors. Creates normals.
     * @param {WebGLRenderingContext} gl 
     * @param {number} width 
     * @param {number} height 
     * @param {number} depth 
     */

    static box( gl, program, width, height, depth, material ) {
        let hwidth = width / 2.0;
        let hheight = height / 2.0;
        let hdepth = depth / 2.0;
        
        let verts = [
            hwidth, -hheight, -hdepth,  1.0, 0.0, 1.0, 1.0,     1.0, 1.0,   
            -hwidth, -hheight, -hdepth, 0.0, 1.0, 1.0, 1.0,     0.0, 1.0, 
            -hwidth, hheight, -hdepth,  0.5, 0.5, 1.0, 1.0,     0.0, 0.0, 
            hwidth, hheight, -hdepth,   1.0, 1.0, 0.5, 1.0,     1.0, 0.0, 

            hwidth, -hheight, hdepth,   1.0, 0.0, 1.0, 1.0,     1.0, 1.0,  
            hwidth, -hheight, -hdepth,  0.0, 1.0, 1.0, 1.0,     0.0, 1.0, 
            hwidth, hheight, -hdepth,   0.5, 0.5, 1.0, 1.0,     0.0, 0.0,  
            hwidth, hheight, hdepth,    1.0, 1.0, 0.5, 1.0,     1.0, 0.0,  

            -hwidth, -hheight, hdepth,  1.0, 0.0, 1.0, 1.0,     1.0, 1.0,  
            hwidth, -hheight, hdepth,   1.0, 1.0, 0.5, 1.0,     0.0, 1.0,  
            hwidth, hheight, hdepth,    0.5, 0.5, 1.0, 1.0,     0.0, 0.0,  
            -hwidth, hheight, hdepth,   0.0, 1.0, 1.0, 1.0,     1.0, 0.0,  
            
            -hwidth, -hheight, hdepth,  1.0, 0.0, 1.0, 1.0,     0.0, 1.0, 
            -hwidth, -hheight, -hdepth, 0.0, 1.0, 1.0, 1.0,     1.0, 1.0, 
            -hwidth, hheight, -hdepth,  0.5, 0.5, 1.0, 1.0,     1.0, 0.0,  
            -hwidth, hheight, hdepth,   1.0, 1.0, 0.5, 1.0,     0.0, 0.0,   

            -hwidth, hheight, -hdepth,  1.0, 0.0, 0.0, 1.0,     0.0, 1.0,  
            hwidth, hheight, -hdepth,   0.0, 1.0, 0.0, 1.0,     1.0, 1.0,  
            hwidth, hheight, hdepth,    0.0, 0.0, 1.0, 1.0,     1.0, 0.0,  
            -hwidth, hheight, hdepth,   1.0, 1.0, 0.0, 1.0,     0.0, 0.0,  

            -hwidth, -hheight, -hdepth, 1.0, 0.0, 0.0, 1.0,     0.0, 1.0,   
            hwidth, -hheight, -hdepth,  0.0, 1.0, 0.0, 1.0,     1.0, 1.0,  
            hwidth, -hheight, hdepth,   0.0, 0.0, 1.0, 1.0,     1.0, 0.0,  
            -hwidth, -hheight, hdepth,  1.0, 1.0, 0.0, 1.0,     0.0, 0.0,  
        ];

        let indis = [
            // clockwise winding
            //0, 3, 2, 2, 1, 0,
            //4, 7, 6, 6, 5, 4,
            //8, 11, 10, 10, 9, 8,
            //12, 13, 14, 14, 15, 12,
            //16, 17, 18, 18, 19, 16,
            //20, 23, 22, 22, 21, 20,
            
            // counter-clockwise winding
            2, 1, 0, 2, 0, 3,
            6, 5, 4, 4, 7, 6,
            10, 9, 8, 8, 11, 10,
            12, 13, 14, 14, 15, 12,
            16, 17, 18, 18, 19, 16,
            22, 21, 20, 20, 23, 22,
        ];

        return new UvMesh( gl, program, verts, indis, material );
    }

    /**
     * Create a box mesh but using UV coordinates that support 6-sided texture mapping. 
     * @param {WebGLRenderingContext} gl 
     * @param {number} width 
     * @param {number} height 
     * @param {number} depth 
     */

     static mapped_box( gl, program, width, height, depth, material ) {
        let hwidth = width / 2.0;
        let hheight = height / 2.0;
        let hdepth = depth / 2.0;

        let verts = [
            hwidth, -hheight, -hdepth,  1.0, 0.0, 1.0, 1.0,     .25, .5,   
            -hwidth, -hheight, -hdepth, 0.0, 1.0, 1.0, 1.0,     0, .5, 
            -hwidth, hheight, -hdepth,  0.5, 0.5, 1.0, 1.0,     0, .25, 
            hwidth, hheight, -hdepth,   1.0, 1.0, 0.5, 1.0,     .25, .25, 

            hwidth, -hheight, hdepth,   1.0, 0.0, 1.0, 1.0,     .5, .5,  
            hwidth, -hheight, -hdepth,  0.0, 1.0, 1.0, 1.0,     .25, .5, 
            hwidth, hheight, -hdepth,   0.5, 0.5, 1.0, 1.0,     .25, .25,  
            hwidth, hheight, hdepth,    1.0, 1.0, 0.5, 1.0,     .5, .25,  

            -hwidth, -hheight, hdepth,  1.0, 0.0, 1.0, 1.0,     .75, .5,  
            hwidth, -hheight, hdepth,   1.0, 1.0, 0.5, 1.0,     .5, .5,  
            hwidth, hheight, hdepth,    0.5, 0.5, 1.0, 1.0,     .5, .25,   
            -hwidth, hheight, hdepth,   0.0, 1.0, 1.0, 1.0,     .75, .25,  
            
            -hwidth, -hheight, hdepth,  1.0, 0.0, 1.0, 1.0,     1, .5, 
            -hwidth, -hheight, -hdepth, 0.0, 1.0, 1.0, 1.0,     .75, .5, 
            -hwidth, hheight, -hdepth,  0.5, 0.5, 1.0, 1.0,     .75, .25,  
            -hwidth, hheight, hdepth,   1.0, 1.0, 0.5, 1.0,     1, .25,   

            -hwidth, hheight, -hdepth,  1.0, 0.0, 0.0, 1.0,     .75,.25,  
            hwidth, hheight, -hdepth,   0.0, 1.0, 0.0, 1.0,     .5, .25,  
            hwidth, hheight, hdepth,    0.0, 0.0, 1.0, 1.0,     .5, 0,  
            -hwidth, hheight, hdepth,   1.0, 1.0, 0.0, 1.0,     .75, 0,  

            -hwidth, -hheight, -hdepth, 1.0, 0.0, 0.0, 1.0,     .75, .75,   
            hwidth, -hheight, -hdepth,  0.0, 1.0, 0.0, 1.0,     .5, .75,  
            hwidth, -hheight, hdepth,   0.0, 0.0, 1.0, 1.0,     .5, .5,  
            -hwidth, -hheight, hdepth,  1.0, 1.0, 0.0, 1.0,     .75, .5,  
        ];

        let indis = [
            // clockwise winding
            0, 3, 2, 2, 1, 0,
            4, 7, 6, 6, 5, 4,
            8, 11, 10, 10, 9, 8,
            12, 13, 14, 14, 15, 12,
            16, 17, 18, 18, 19, 16,
            20, 23, 22, 22, 21, 20,
        ];

        return new UvMesh( gl, program, verts, indis, material );
    }



    /**
     * Render the mesh. Does NOT preserve array/index buffer, program, or texture bindings! 
     * 
     * @param {WebGLRenderingContext} gl 
     */
    render( gl ) {
        gl.enable( gl.CULL_FACE );
        
        gl.useProgram( this.program );
        this.set_vertex_attributes();
        gl.bindBuffer( gl.ARRAY_BUFFER, this.verts );
        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indis );
        bind_texture_samplers( gl, this.program, "tex_0" );

        gl.activeTexture( gl.TEXTURE0 );
        this.material.bind( gl );

        gl.drawElements( gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0 );
    }
}
