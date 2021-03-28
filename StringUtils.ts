

export class StringUtils {

    /**
     * Converts arguments as a string.
     *
     * This is a helper function to make sure every value's string presentation is actually used.
     *
     * JavaScript uses .valueOf() in many instances instead of .toString().
     *
     * See also https://stackoverflow.com/a/2485794/901430
     *
     * @param values
     */
    public static toString (...values : any[]) : string {

        return values.join("");

    }

}

export default StringUtils;
