{% macro section(entries, title, description) %}
    <section>
        <h3>{{ title }}</h3>
        <div class="progress">
            <meter max="{{ entries | length }}" value="{{ entries | hasArm | length }}">{{ entries | hasArm | length }}/{{ entries | length }}</meter>
            <p>{{ entries | hasArm | length }}/{{ entries | length }}</p>
        </div>
        <p>{{ description }}</p>
        <table class="entry-list">
            {% for item in entries %}
                <tr>
                    <td class="{{ item.armVersion }}">
                        <a href="{{ item.link }}">{{ item.name }}</a>
                    </td>
                </tr>
            {% endfor %}
        </table>
    </section>
{% endmacro %}