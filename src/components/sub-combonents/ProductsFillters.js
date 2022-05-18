import "./ProductsFillters.modules.scss"

export default function ProductsFillters(){
  return (
    <div className="filter">
      <h3>Multi Range</h3>
      <div>
        <input type="radio" id="huey" name="drone" value="huey" checked />
        <label for="huey">Huey</label>
      </div>

      <div>
        <input type="radio" id="dewey" name="drone" value="dewey" />
        <label for="dewey">Dewey</label>
      </div>

      <div>
        <input type="radio" id="louie" name="drone" value="louie" />
        <label for="louie">Louie</label>
      </div>
    </div>
  )
}