/**
 * @swagger
 * /signin:
 *  post:
 *    tags:
 *      - Users
 *    name: signin
 *    summary: user sign in
 *    produces:
 *      - application/json
 *    consumes:
 *      - application/json
 *
 *    parameters:
 *      - name: body
 *        in: body
 *        schema:
 *          $ref: '#/definitions/User'
 *          type: object
 *          properties:
 *            username:
 *              type: string
 *            password:
 *              type: string
 *              format: password
 *        required:
 *          - username
 *          - password
 *    responses:
 *      '201':
 *        description: User found and logged in successfully.
 *      '401':
 *        description: Authentication failed. User not found.
 *      '403':
 *        description: Authentication failed. Wrong password.
 */

/**
 * @swagger
 * /signup:
 *  post:
 *    tags:
 *      - Users
 *    name: signin
 *    summary: user sign up
 *    produces:
 *      - application/json
 *    consumes:
 *      - application/json
 *
 *    parameters:
 *      - name: body
 *        in: body
 *        schema:
 *          $ref: '#/definitions/User'
 *          type: object
 *          properties:
 *            username:
 *              type: string
 *            password:
 *              type: string
 *              format: password
 *        required:
 *          - username
 *          - password
 *    responses:
 *      '201':
 *        description: User signed up successfully.
 *      '400':
 *        description: Wrong params.
 *      '409':
 *        description: User already exist.
 */

/**
 * @swagger
 * /roles:
 *  get:
 *    tags:
 *      - Roles
 *    name: roles
 *    summary: Get list of family roles
 *    security:
 *      - bearerAuth: []
 *    produces:
 *      - application/json
 *    consumes:
 *      - application/json
 *
 *    responses:
 *      '200':
 *        description: Ok.
 *      '400':
 *        description: Other error.
 */

/**
 * @swagger
 * /roles:
 *  post:
 *    tags:
 *      - Roles
 *    name: roles
 *    summary: Create a new family role
 *    security:
 *      - bearerAuth: []
 *    produces:
 *      - application/json
 *    consumes:
 *      - application/json
 *
 *    parameters:
 *      - name: body
 *        in: body
 *        schema:
 *          $ref: '#/definitions/Role'
 *          type: object
 *          properties:
 *            role:
 *              type: string
 *        required:
 *          - role
 *    responses:
 *      '201':
 *        description: Role created successfully.
 *      '400':
 *        description: Wrong params / Other error.
 */

/**
 * @swagger
 * /families:
 *  get:
 *    tags:
 *      - Families
 *    name: families
 *    summary: Get list of families
 *    security:
 *      - bearerAuth: []
 *    produces:
 *      - application/json
 *    consumes:
 *      - application/json

 *    responses:
 *      '200':
 *        description: Ok.
 *      '400':
 *        description: Other error.
 */

/**
 * @swagger
 * /families:
 *  post:
 *    tags:
 *      - Families
 *    name: families
 *    summary: Create a new family
 *    security:
 *      - bearerAuth: []
 *    produces:
 *      - application/json
 *    consumes:
 *      - application/json
 *
 *    parameters:
 *      - in: body
 *        schema:
 *          $ref: '#/definitions/Family'
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *        required:
 *          - name
 *    responses:
 *      '201':
 *        description: Family created successfully.
 *      '400':
 *        description: Wrong params / Other error.
 */

/**
 * @swagger
 * /families/{familyId}:
 *  delete:
 *    tags:
 *      - Families
 *    name: families
 *    summary: Delete a family
 *    security:
 *      - bearerAuth: []
 *    produces:
 *      - application/json
 *    consumes:
 *      - application/json
 *
 *    parameters:
 *      - in: path
 *        name: familyId
 *        type: string
 *        required: true
 *        description: Family id to delete
 *
 *    responses:
 *      '204':
 *        description: Deleted successfully.
 *      '400':
 *        description: Wrong params / Other error.
 *      '404':
 *        description: Family not found.
 */

/**
 * @swagger
 * /families/{familyId}/generations:
 *  get:
 *    tags:
 *      - Generations
 *    name: generations
 *    summary: Get list of family generations
 *    security:
 *      - bearerAuth: []
 *    produces:
 *      - application/json
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: familyId
 *        type: string
 *        description: Family id
 *        required: true
 *    responses:
 *      '200':
 *        description: Ok.
 *      '400':
 *        description: Other error.
 */

/**
 * @swagger
 * /families/{familyId}/generations:
 *  post:
 *    tags:
 *      - Generations
 *    name: generations
 *    summary: Create a new generation
 *    security:
 *      - bearerAuth: []
 *    produces:
 *      - application/json
 *    consumes:
 *      - application/json
 *
 *    parameters:
 *      - in: path
 *        name: familyId
 *        type: string
 *        description: Family id
 *
 *      - in: body
 *        schema:
 *          $ref: '#/definitions/Generation'
 *          type: object
 *          properties:
 *            position:
 *              type: number
 *        required:
 *          - position
 *          - familyId
 *    responses:
 *      '201':
 *        description: Generation created successfully.
 *      '400':
 *        description: Wrong params / Other error.
 */

/**
 * @swagger
 * /families/{familyId}/generations/{generationId}:
 *  delete:
 *    tags:
 *      - Generations
 *    name: generations
 *    summary: Delete a generation from family
 *    security:
 *      - bearerAuth: []
 *    produces:
 *      - application/json
 *    consumes:
 *      - application/json
 *    parameters:
 *       - name: familyId
 *         in: path
 *         description: familyId
 *         required: true
 *         schema:
 *           type: string
 *       - name: generationId
 *         in: path
 *         description: generationId
 *         required: true
 *         schema:
 *           type: string
 *
 *    responses:
 *      '204':
 *        description: Deleted successfully.
 *      '400':
 *        description: Wrong params / Other error.
 *      '404':
 *        description: Generation not found.
 */

/**
 * @swagger
 * /families/{familyId}/generations/{generationId}/peoples:
 *  get:
 *    tags:
 *      - Peoples
 *    name: peoples
 *    summary: Get list of peoples from generation's family
 *    security:
 *      - bearerAuth: []
 *    produces:
 *      - application/json
 *    consumes:
 *      - application/json
 *    parameters:
 *       - name: familyId
 *         in: path
 *         description: familyId
 *         required: true
 *         schema:
 *           type: string
 *       - name: generationId
 *         in: path
 *         description: generationId
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         schema:
 *          $ref: '#/definitions/People'
 *          type: object
 *    responses:
 *      '200':
 *        description: Ok.
 *      '400':
 *        description: Other error.
 */

/**
 * @swagger
 * /families/{familyId}/generations/{generationId}/peoples:
 *  post:
 *    tags:
 *      - Peoples
 *    name: peoples
 *    summary: Create a new people
 *    security:
 *      - bearerAuth: []
 *    produces:
 *      - application/json
 *    consumes:
 *      - application/json
 *
 *    parameters:
 *       - name: familyId
 *         in: path
 *         description: familyId
 *         required: true
 *         schema:
 *           type: string
 *       - name: generationId
 *         in: path
 *         description: generationId
 *         required: true
 *         schema:
 *           type: string
 *
 *       - in: body
 *         schema:
 *          $ref: '#/definitions/People'
 *          type: object
 *          properties:
 *              firstname:
 *                  type: string
 *              lastname:
 *                  type: string
 *              roleId:
 *                  type: string
 *         required:
 *          - firstname
 *          - lastname
 *          - roleId
 *    responses:
 *      '201':
 *        description: People created successfully.
 *      '400':
 *        description: Wrong params / Other error.
 */

/**
 * @swagger
 * /families/{familyId}/generations/{generationId}/peoples/{peopleId}:
 *  delete:
 *    tags:
 *      - Peoples
 *    name: peoples
 *    summary: Delete a people from generation's family
 *    security:
 *      - bearerAuth: []
 *    produces:
 *      - application/json
 *    consumes:
 *      - application/json
 *    parameters:
 *       - name: familyId
 *         in: path
 *         description: familyId
 *         required: true
 *         schema:
 *           type: string
 *       - name: generationId
 *         in: path
 *         description: generationId
 *         required: true
 *         schema:
 *           type: string
 *       - name: peopleId
 *         in: path
 *         description: peopleId
 *         required: true
 *         schema:
 *           type: string
 *
 *    responses:
 *      '204':
 *        description: Deleted successfully.
 *      '400':
 *        description: Wrong params / Other error.
 *      '404':
 *        description: People not found.
 */
