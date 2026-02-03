import requests
import sys
import json
from datetime import datetime

class BeautySalonAPITester:
    def __init__(self, base_url="https://belleza-rosa.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            else:
                print(f"❌ Unsupported method: {method}")
                return False, {}

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response preview: {str(response_data)[:200]}...")
                    return True, response_data
                except:
                    return True, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}...")
                self.failed_tests.append({
                    'name': name,
                    'expected': expected_status,
                    'actual': response.status_code,
                    'response': response.text[:200]
                })
                return False, {}

        except requests.exceptions.RequestException as e:
            print(f"❌ Failed - Network Error: {str(e)}")
            self.failed_tests.append({
                'name': name,
                'error': str(e)
            })
            return False, {}

    def test_root_endpoint(self):
        """Test API root endpoint"""
        return self.run_test(
            "API Root",
            "GET",
            "",
            200
        )

    def test_services_endpoint(self):
        """Test services endpoint"""
        success, response = self.run_test(
            "Services API",
            "GET",
            "services",
            200
        )
        
        if success:
            # Validate services structure
            expected_categories = ['manicuras', 'pedicuras', 'pestanas', 'facial', 'depilacion', 'micropigmentacion']
            for category in expected_categories:
                if category not in response:
                    print(f"⚠️  Warning: Missing category '{category}' in services")
                else:
                    if 'items' not in response[category]:
                        print(f"⚠️  Warning: Category '{category}' missing 'items' field")
                    else:
                        print(f"✅ Category '{category}' has {len(response[category]['items'])} items")
        
        return success, response

    def test_gallery_endpoint(self):
        """Test gallery endpoint"""
        success, response = self.run_test(
            "Gallery API",
            "GET",
            "gallery",
            200
        )
        
        if success and isinstance(response, list):
            print(f"✅ Gallery contains {len(response)} items")
            # Check if gallery items have required fields
            for i, item in enumerate(response[:3]):  # Check first 3 items
                required_fields = ['id', 'title_es', 'title_en', 'category', 'image']
                for field in required_fields:
                    if field not in item:
                        print(f"⚠️  Warning: Gallery item {i} missing field '{field}'")
        
        return success, response

    def test_contact_submission(self):
        """Test contact form submission"""
        test_data = {
            "name": "Test User",
            "email": "test@example.com",
            "phone": "123456789",
            "service": "manicuras",
            "message": "This is a test message for the contact form functionality."
        }
        
        success, response = self.run_test(
            "Contact Form Submission",
            "POST",
            "contact",
            200,
            data=test_data
        )
        
        if success:
            if 'success' in response and response['success']:
                print("✅ Contact form submission successful")
            else:
                print("⚠️  Warning: Contact response doesn't indicate success")
        
        return success, response

    def test_contact_retrieval(self):
        """Test contact messages retrieval (admin endpoint)"""
        return self.run_test(
            "Contact Messages Retrieval",
            "GET",
            "contact",
            200
        )

    def test_invalid_endpoints(self):
        """Test invalid endpoints return proper errors"""
        success, _ = self.run_test(
            "Invalid Endpoint",
            "GET",
            "nonexistent",
            404
        )
        return success

def main():
    print("🚀 Starting Beauty Salon API Tests")
    print("=" * 50)
    
    tester = BeautySalonAPITester()
    
    # Test all endpoints
    print("\n📋 Testing Core API Endpoints...")
    tester.test_root_endpoint()
    tester.test_services_endpoint()
    tester.test_gallery_endpoint()
    
    print("\n📝 Testing Contact Functionality...")
    tester.test_contact_submission()
    tester.test_contact_retrieval()
    
    print("\n🚫 Testing Error Handling...")
    tester.test_invalid_endpoints()
    
    # Print final results
    print("\n" + "=" * 50)
    print(f"📊 Test Results: {tester.tests_passed}/{tester.tests_run} passed")
    
    if tester.failed_tests:
        print("\n❌ Failed Tests:")
        for test in tester.failed_tests:
            print(f"   - {test['name']}: {test.get('error', f\"Expected {test.get('expected')}, got {test.get('actual')}\")}")
    
    success_rate = (tester.tests_passed / tester.tests_run) * 100 if tester.tests_run > 0 else 0
    print(f"\n📈 Success Rate: {success_rate:.1f}%")
    
    if success_rate >= 80:
        print("✅ Backend API tests mostly successful!")
        return 0
    else:
        print("❌ Backend API has significant issues!")
        return 1

if __name__ == "__main__":
    sys.exit(main())