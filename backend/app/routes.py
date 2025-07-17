from flask import Blueprint, request, jsonify
from app.scanners.sql_injection import test_sql_injection
from app.scanners.xss import test_xss
from app.scanners.csrf import test_csrf

main = Blueprint('main', __name__)

@main.route('/scan', methods=['POST'])
def scan():
    try:
        url = request.form.get('url')
        param = request.form.get('param')
        scan_type = request.form.get('scan_type')

        if not url or not scan_type:
            return jsonify({"error": "Missing required fields: url and scan_type"}), 400

        if scan_type == 'sql_injection' and not param:
            return jsonify({"error": "Parameter required for SQL injection scan"}), 400
        if scan_type == 'xss' and not param:
            return jsonify({"error": "Parameter required for XSS scan"}), 400

        if scan_type == 'sql_injection':
            results = test_sql_injection(url, param)
        elif scan_type == 'xss':
            results = test_xss(url, param)
        elif scan_type == 'csrf':
            results = test_csrf(url)
        else:
            return jsonify({"error": "Invalid scan type"}), 400

        return jsonify({"status": "success", "results": results})
    except Exception as e:
        return jsonify({"error": str(e)}), 500